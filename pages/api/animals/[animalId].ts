import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../../util/auth';
import {
  deleteAnimalById,
  getAnimalById,
  getValidSessionByToken,
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

  // check for the csrfToken
  if (!req.body.csrfToken) {
    return res.status(400).json({
      error: 'no csrf token Found',
    });
  }
  // 1. we get the csrfToken from the body
  const csrfToken = req.body.csrfToken;

  // 2. we get the sessionToken from the cookies
  const sessionToken = req.cookies.sessionToken;

  // 3. we get the session for this session Token
  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return res.status(403).json({
      error: 'unauthorized user',
    });
  }
  // 4 we validate the csrf token against the seed we have in the database
  if (!(await verifyCsrfToken(session.csrfSecret, csrfToken))) {
    return res.status(403).json({
      error: 'csrf is not valid',
    });
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
