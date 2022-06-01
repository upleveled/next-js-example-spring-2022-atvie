import Head from 'next/head';
import { updateAnimalById } from '../../../util/database';

export default function AnimalUpdateDontCopy(props) {
  if (!props.updatedAnimal) {
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
        <title>Animal Management (naive, don't copy)</title>
        <meta
          name="description"
          content="Animal Management (naive, don't copy)"
        />
      </Head>

      <h1>Animal Management - UPDATE</h1>

      <div>Updated {props.updatedAnimal.firstName}</div>

      <div>id: {props.updatedAnimal.id}</div>
      <div>type: {props.updatedAnimal.type}</div>
      <div>accessory: {props.updatedAnimal.accessory}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  const updatedAnimal = await updateAnimalById(
    context.query.animalId,
    context.query.firstName,
    context.query.accessory,
  );
  return {
    props: {
      updatedAnimal: updatedAnimal || null,
    },
  };
}
