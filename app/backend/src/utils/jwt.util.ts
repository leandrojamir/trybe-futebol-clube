import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import * as JWT from 'jsonwebtoken';
import { IJwt, IToken } from '../interfaces/users.interfaces';

config();

const createToken = (data: IJwt | boolean) => {
  const token = sign({ data }, String(process.env.JWT_SECRET), {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

// 12 - Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end
const validateToken = (token: string) => {
  // Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`.
  const erroLinter = JWT.verify(token, String(process.env.JWT_SECRET));
  return erroLinter as IToken;
};

export {
  createToken,
  validateToken,
};
