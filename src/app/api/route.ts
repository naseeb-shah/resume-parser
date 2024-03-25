
import type { NextApiRequest, NextApiResponse } from 'next'


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log('Response object:', res,req);
    // Handle GET request
    res.send({ message: 'This is a dummy response for GET request' });
  }
  