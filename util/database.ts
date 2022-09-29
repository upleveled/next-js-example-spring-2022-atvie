import postgres from 'postgres';

const sql = postgres();

export type Animal = {
  id: number;
  first_name: string;
  type: string;
  accessory: string;
};

const id = 1;
sql<Animal[]>`SELECT * FROM animals WHERE id = 1`;
sql<Animal[]>`SELECT * FROM animals WHERE id = ${id}`;
