import Head from 'next/head';
import Image from 'next/image';
import { animalsDatabase } from '../../util/database';

export default function Animal(props) {
  if (!props.animal) {
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
          {props.animal.name}, the {props.animal.type}
        </title>
        <meta
          name="description"
          content={`${props.animal.name} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>

      <h1>{props.animal.name}</h1>

      <div>
        <div>
          <div>
            <Image src={`/${props.animal.id}.jpeg`} width="400" height="300" />
          </div>
          <div>id: {props.animal.id}</div>
          <div>accessory: {props.animal.accessory}</div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const foundAnimal = animalsDatabase.find((animal) => {
    return (
      animal.id ===
      // This comes from the URL, and its name
      // is based on the filename [animalId].js
      context.query.animalId
    );
  });

  if (!foundAnimal) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      animal: foundAnimal || null,
    },
  };
}
