import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { IJwt } from '../interfaces/users.interfaces';

config();

const createToken = (data: IJwt | boolean) => {
  const token = sign({ data }, String(process.env.JWT_SECRET), {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export default createToken;
