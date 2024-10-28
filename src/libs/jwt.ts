import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export function createToken(payload: any) {
  return new Promise((resolve, reject) => {
    dotenv.config();
    if (process.env.JWT_SECRET === undefined) {
      reject('JWT_SECRET is not defined');
      return;
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
      (err: any, token: any) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

