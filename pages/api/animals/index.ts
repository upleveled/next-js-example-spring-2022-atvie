import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../../util/auth';
import {
  getAnimals,
  getValidSessionByToken,
  insertAnimal,
} from '../../../util/database';

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
  const session = await getValidSessionByToken(sessionToken || '');

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
