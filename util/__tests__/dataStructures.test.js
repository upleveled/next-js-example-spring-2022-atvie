import { getReducedAnimalWithFoods } from '../dataStructures';

test('reduces animal favorite foods', () => {
  const animalWithFoods = [
    {
      animalId: 1,
      animalFirstName: 'Peter',
      animalType: 'Baboon',
      animalAccessory: 'Banana',
      foodId: 1,
      foodName: 'Banana',
    },
    {
      animalId: 1,
      animalFirstName: 'Peter',
      animalType: 'Baboon',
      animalAccessory: 'Banana',
      foodId: 5,
      foodName: 'Worms',
    },
  ];

  expect(getReducedAnimalWithFoods(animalWithFoods)).toStrictEqual({
    id: 1,
    firstName: 'Peter',
    type: 'Baboon',
    accessory: 'Banana',
    foods: [
      { id: 1, name: 'Banana' },
      { id: 5, name: 'Worms' },
    ],
  });

  expect(getReducedAnimalWithFoods(animalWithFoods));
});
