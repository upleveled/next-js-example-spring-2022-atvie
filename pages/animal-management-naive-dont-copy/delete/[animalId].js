import Head from 'next/head';
import { deleteAnimalById } from '../../../util/database';

export default function AnimalDeleteDontCopy(props) {
  if (!props.deletedAnimal) {
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

      <h1>Animal Management - DELETE</h1>

      <div>In memorium of {props.deletedAnimal.firstName}</div>
      <div>id: {props.deletedAnimal.id}</div>
      <div>type: {props.deletedAnimal.type}</div>
      <div>accessory: {props.deletedAnimal.accessory}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context.query);
  const deletedAnimal = await deleteAnimalById(context.query.animalId);
  return {
    props: {
      deletedAnimal: deletedAnimal || null,
    },
  };
}
