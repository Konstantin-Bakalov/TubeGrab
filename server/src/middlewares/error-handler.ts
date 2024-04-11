import { ErrorRequestHandler } from 'express';

// need to disable this rule so that express recognises this signature
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log('error', err);
  res.status(500).json({ message: 'Internal server error' });
};
