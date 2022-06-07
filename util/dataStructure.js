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
