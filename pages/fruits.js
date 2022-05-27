import Link from 'next/link';
import { fruitsDatabase } from '../util/database';

// const fruitsDatabase = [
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

export default function Fruits(props) {
  return (
    <ul>
      {props.fruits.map((fruit) => {
        return (
          <li key={`fruit-${fruit.id}`}>
            <Link href={`/fruits/${fruit.id}`}>{fruit.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

// Code in getServerSideProps runs in
// Node.js (on the server)
//
// Important: ONLY in the /pages directory
export function getServerSideProps() {
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      fruits: fruitsDatabase,
    },
  };
}
