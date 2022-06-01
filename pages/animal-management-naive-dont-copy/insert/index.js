import Head from 'next/head';
import { insertAnimal } from '../../../util/database';

export default function AnimalInserteDontCopy(props) {
  if (!props.insertedAnimal) {
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

      <h1>Animal Management - INSERT</h1>

      <div>Inserted {props.insertedAnimal.firstName}</div>

      <div>id: {props.insertedAnimal.id}</div>
      <div>type: {props.insertedAnimal.type}</div>
      <div>accessory: {props.insertedAnimal.accessory}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  const insertedAnimal = await insertAnimal(
    context.query.firstName,
    context.query.type,
    context.query.accessory,
  );
  return {
    props: {
      insertedAnimal: insertedAnimal || null,
    },
  };
}
