import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserWithPasswordHashByUsername } from '../../util/database';

export type LoginResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | { user: { id: number } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>,
) {
  // check the method to be post
  if (req.method === 'POST') {
    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ errors: [{ message: 'username or password not provided' }] });
      return;
    }

    // Make sure you don't expose this variable
    const userWithPasswordHashUseWithCaution =
      await getUserWithPasswordHashByUsername(req.body.username);

    if (!userWithPasswordHashUseWithCaution) {
      res
        .status(401)
        .json({ errors: [{ message: 'Username or password does not match' }] });
      return;
    }

    // hash the password
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      userWithPasswordHashUseWithCaution.passwordHash,
    );

    if (!passwordMatches) {
      res
        .status(401)
        .json({ errors: [{ message: 'Username or password does not match' }] });
      return;
    }
    const userId = userWithPasswordHashUseWithCaution.id;

    // TODO: create a session for this user

    // if you want to use username as identifier return the username too
    res.status(200).json({ user: { id: userId } });
  } else {
    res.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
