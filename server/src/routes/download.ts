import { Router } from 'express';
import { requestHandler } from '../error-handler';

const downloadRouter = Router();

downloadRouter.post(
  '/',
  requestHandler(async (req, res) => {
    const url = req.body.url;

    res.status(200).json({ url });
  }),
);

export { downloadRouter };
