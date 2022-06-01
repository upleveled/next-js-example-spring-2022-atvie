const animalsFoods = [
  { animal_id: 1, food_id: 1 }, // Peter likes bananas
  { animal_id: 1, food_id: 5 }, // Peter likes worms
  { animal_id: 3, food_id: 5 }, // Severus likes worms
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO animals_foods ${sql(animalsFoods, 'animal_id', 'food_id')}
  `;
};

exports.down = async (sql) => {
  for (const animalsFood of animalsFoods) {
    await sql`
      DELETE FROM
			  animals_foods
      WHERE
        animal_id = ${animalsFood.animal_id} AND
        food_id = ${animalsFood.food_id}
    `;
  }
};
