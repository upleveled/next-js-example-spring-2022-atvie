const animals = [
  { first_name: 'Peter', type: 'Baboon', accessory: 'Banana' },
  { first_name: 'Rita', type: 'Lion', accessory: 'Gold chain' },
  { first_name: 'Severus', type: 'Snake', accessory: 'Maracas' },
  { first_name: 'Polly', type: 'Crab', accessory: 'Knife' },
  { first_name: 'Rebecca', type: 'Elephant', accessory: 'Pink bow' },
  { first_name: 'Harry', type: 'Zebra-Eagle', accessory: 'Fishing rod' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO animals ${sql(animals, 'first_name', 'type', 'accessory')}
  `;
};

exports.down = async (sql) => {
  for (const animal of animals) {
    await sql`
      DELETE FROM
        animals
      WHERE
        first_name = ${animal.first_name} AND
        type = ${animal.type} AND
        accessory = ${animal.accessory}
    `;
  }
};
