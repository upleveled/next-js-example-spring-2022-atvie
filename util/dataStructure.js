export function getReducedAnimalsWithFoods(animalsWithFoods) {
  const animalWithFoods = {
    id: animalsWithFoods[0].animalId,
    firstName: animalsWithFoods[0].animalFirstName,
    type: animalsWithFoods[0].animalType,
    accessory: animalsWithFoods[0].animalAccessory,
    foods: animalsWithFoods.map((food) => {
      return {
        id: food.foodId,
        name: food.foodName,
      };
    }),
  };
  return animalWithFoods;
}

// [
//   {
//     animalId: 1,
//     animalFirstName: 'Peter',
//     animalType: 'Baboon',
//     animalAccessory: 'Banana',
//     foodId: 1,
//     foodName: 'Banana'
//   },
//   {
//     animalId: 1,
//     animalFirstName: 'Peter',
//     animalType: 'Baboon',
//     animalAccessory: 'Banana',
//     foodId: 5,
//     foodName: 'Worms'
//   }
// ]
// {
//   id: 1,
//   firstName: 'Peter',
//   type: 'Baboon',
//   accessory: 'Banana',
//   foods: [ { id: 1, name: 'Banana' }, { id: 5, name: 'Worms' } ]
// }
