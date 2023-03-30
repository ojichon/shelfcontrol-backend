import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
};
