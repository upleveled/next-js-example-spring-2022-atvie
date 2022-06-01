import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getAnimals() {
  const animals = await sql`
    SELECT * FROM animals
  `;
  return animals.map((animal) => camelcaseKeys(animal));
}

export async function getAnimalById(id) {
  const [animal] = await sql`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;
  return camelcaseKeys(animal);
}

export async function getAnimalWithFoodsById(animalId) {
  // Join query
  const animalsWithFoods = await sql`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.id AS food_id,
      foods.name AS food_name
    FROM
      animals,
      animals_foods,
      foods
    WHERE
      animals.id = ${animalId} AND
      animals_foods.animal_id = animals.id AND
      foods.id = animals_foods.food_id
  `;
  return camelcaseKeys(animalsWithFoods);
}

export async function insertAnimal(firstName, type, accessory) {
  const [animal] = await sql`
    INSERT INTO animals
      (first_name, type, accessory)
    VALUES
      (${firstName}, ${type}, ${accessory})
    RETURNING *
  `;
  return camelcaseKeys(animal);
}

export async function updateAnimalById(id, firstName, accessory) {
  const [animal] = await sql`
    UPDATE
      animals
    SET
      first_name = ${firstName},
      accessory = ${accessory}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseKeys(animal);
}

export async function deleteAnimalById(id) {
  const [animal] = await sql`
    DELETE FROM
      animals
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseKeys(animal);
}

export const fruitsDatabase = [
  {
    id: '1',
    name: 'papaya',
    color: 'green',
    ripeness: 10,
    icon: '🫒',
  },
  {
    id: '2',
    name: 'apple',
    color: 'red',
    ripeness: 4,
    icon: '🍎',
  },
  {
    id: '3',
    name: 'lemon',
    color: 'yellow',
    ripeness: 1,
    icon: '🍋',
  },
  {
    id: '4',
    name: 'banana',
    color: 'black',
    ripeness: 'nope',
    icon: '🍌',
  },
];
