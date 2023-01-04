// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prepareConnection } from 'db';
import { User } from 'db/entity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await prepareConnection();
  const result = await connection.getRepository(User).find();

  res.status(200).send({
    data: result,
  });
}
