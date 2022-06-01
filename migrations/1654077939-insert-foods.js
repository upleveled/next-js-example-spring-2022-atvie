const foods = [
  { name: 'Banana' },
  { name: 'Peanuts' },
  { name: 'Grass' },
  { name: 'Mollusks' },
  { name: 'Worms' },
  { name: 'Zebra' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO foods ${sql(foods, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const food of foods) {
    await sql`
      DELETE FROM
        food
      WHERE
        name = ${food.name}
    `;
  }
};
