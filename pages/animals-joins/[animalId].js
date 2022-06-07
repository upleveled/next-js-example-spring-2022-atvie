import Head from 'next/head';
import Image from 'next/image';
import { getAnimalWithFoodsById } from '../../util/database';
import { getReducedAnimalsWithFoods } from '../../util/dataStructure';

export default function Animal(props) {
  if (!props.animalWithFoods) {
    return (
      <div>
        <Head>
          <title>Animal not found</title>
          <meta
            name="description"
            content="Unfortunately, we have had trouble locating the animal you are looking for. Better luck next time."
          />
        </Head>

        <h1>Animal not found</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {props.animalWithFoods.firstName}, the {props.animalWithFoods.type}
        </title>
        <meta
          name="description"
          content={`${props.animalWithFoods.firstName} is a ${props.animalWithFoods.type} with a ${props.animalWithFoods.accessory}`}
        />
      </Head>

      <h1>{props.animalWithFoods.firstName}</h1>

      <div>
        <div>
          <div>
            <Image
              src={`/${props.animalWithFoods.id}.jpeg`}
              width="400"
              height="300"
            />
          </div>
          <div>id: {props.animalWithFoods.id}</div>
          <div>accessory: {props.animalWithFoods.accessory}</div>
          <div>
            foods:
            <ul>
              {props.animalWithFoods.foods.map((food) => {
                return <li key={`food-${food.id}`}>{food.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const animalsWithFoods = await getAnimalWithFoodsById(context.query.animalId);

  const animalWithFoods = getReducedAnimalsWithFoods(animalsWithFoods);

  return {
    props: {
      animalWithFoods,
    },
  };
}
