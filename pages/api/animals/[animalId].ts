import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
} from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const animalId = Number(req.query.animalId);

  if (!animalId) {
    return res.status(400).json({ error: 'animalId must be a valid id' });
  }

  if (req.method === 'GET') {
    const animal = await getAnimalById(animalId);

    if (!animal) {
      return res.status(400).json({ error: 'animalId must be a valid id' });
    }

    return res.status(200).json(animal);
  }

  if (req.method === 'PUT') {
    if (!animalId || !req.body.firstName || !req.body.accessory) {
      return res.status(400).json({
        error:
          'Insert an animal need both a valid id, firstName, and accessory',
      });
    }

    // TODO: add a fail case when id is not a valid animalId

    const updatedAnimal = await updateAnimalById(
      animalId,
      req.body.firstName,
      req.body.accessory,
    );

    return res.status(200).json(updatedAnimal);
  }

  if (req.method === 'DELETE') {
    const deletedAnimal = await deleteAnimalById(animalId);

    // TODO: add a fail case when id is not a valid animalId

    return res.status(200).json(deletedAnimal);
  }

  // If we are using any method that is not allowed
  res.status(405).json({
    error: 'Method not allowed',
  });
}
