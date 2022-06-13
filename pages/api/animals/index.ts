import { NextApiRequest, NextApiResponse } from 'next';
import { getAnimals, insertAnimal } from '../../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // if method GET
  if (req.method === 'GET') {
    // get the animals from my database
    const animals = await getAnimals();

    return res.status(200).json(animals);
  }

  // if method POST
  if (req.method === 'POST') {
    if (!req.body.firstName || !req.body.type || !req.body.accessory) {
      return res.status(400).json({
        error: 'Insert an animal need both firstName, type, and accessory',
      });
    }

    const newAnimal = await insertAnimal(
      req.body.firstName,
      req.body.type,
      req.body.accessory,
    );

    return res.status(200).json(newAnimal);
  }

  // If we are using any method that is not allowed
  res.status(405).json({
    error: 'Method not allowed',
  });
}
