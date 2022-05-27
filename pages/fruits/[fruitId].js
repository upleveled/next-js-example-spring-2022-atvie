import Cookies from 'js-cookie';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { fruitsDatabase } from '../../util/database';

// export const fruitsDatabase = [
//   {
//     id: '1',
//     name: 'papaya',
//     color: 'green',
//     ripeness: 10,
//     icon: '🫒',
//   },
//   {
//     id: '2',
//     name: 'apple',
//     color: 'red',
//     ripeness: 4,
//     icon: '🍎',
//   },
//   {
//     id: '3',
//     name: 'lemon',
//     color: 'yellow',
//     ripeness: 1,
//     icon: '🍋',
//   },
//   {
//     id: '4',
//     name: 'banana',
//     color: 'black',
//     ripeness: 'nope',
//     icon: '🍌',
//   },
// ];

export default function Fruit(props) {
  // Check if the fruit is inside of the diet by checking the property eatCounter
  const [isInDiet, setIsInDiet] = useState('eatCounter' in props.fruit);
  // initialize the eatCounter with the value of the cookie or 0
  const [eatCounter, setEatCounter] = useState(props.fruit.eatCounter || 0);

  return (
    <div>
      <div>{props.fruit.icon}</div>
      <ul>
        <li> name: {props.fruit.name}</li>
        <li> color: {props.fruit.color}</li>
        <li> ripeness: {props.fruit.ripeness}</li>
      </ul>
      <button
        onClick={() => {
          // 1. get the original array from the cookies
          const currentDiet = Cookies.get('diet') // is diet defined???
            ? getParsedCookie('diet') // if true
            : []; // if false
          let newDiet;

          // if the fruit is inside of the diet ???
          if (
            currentDiet.find((fruitInDiet) => props.fruit.id === fruitInDiet.id)
          ) {
            newDiet = currentDiet.filter(
              (fruitInDiet) => fruitInDiet.id !== props.fruit.id,
            );
            setIsInDiet(false);
            setEatCounter(0);
          } else {
            // 2. add the value (spread operator)
            newDiet = [...currentDiet, { id: props.fruit.id, eatCounter: 0 }];
            setIsInDiet(true);
          }

          // 3. set the cookie to the new value
          setStringifiedCookie('diet', newDiet);
        }}
      >
        {isInDiet ? 'remove from diet' : 'add to diet'}
      </button>
      <br />
      {isInDiet ? (
        <>
          {eatCounter}
          <button
            onClick={() => {
              setEatCounter(eatCounter + 1);
              // 1. get the cookie
              const currentDiet = Cookies.get('diet') // is diet defined???
                ? getParsedCookie('diet') // if true
                : []; // if false

              // 2. get the fruit
              const currentFruitInDiet = currentDiet.find(
                (fruitInDiet) => props.fruit.id === fruitInDiet.id,
              );

              // 3. update the counter inside of the fruit
              currentFruitInDiet.eatCounter += 1;
              // 4. set the new cookie
              setStringifiedCookie('diet', currentDiet);
            }}
          >
            eat one
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export function getServerSideProps(context) {
  // 1. Get the value of the cookie from the request object
  const currentDiet = JSON.parse(context.req.cookies.diet || '[]');

  // 2. get the id from the url and use it to match the single fruit id
  const singleFruit = fruitsDatabase.find((fruit) => {
    return fruit.id === context.query.fruitId;
  });

  // 3. Find the object that represent the fruit in the url
  const currentFruitInDiet = currentDiet.find(
    (fruitInDiet) => singleFruit.id === fruitInDiet.id,
  );

  // 4. create a new object adding the properties from the cookie object to the fruit in database
  const superFruit = { ...singleFruit, ...currentFruitInDiet };

  return {
    props: {
      fruit: superFruit,
    },
  };
}
