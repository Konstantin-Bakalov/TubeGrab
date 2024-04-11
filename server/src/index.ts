import cors from 'cors';
import express, { json } from 'express';
import { config } from '../config';
import { errorHandler } from './middlewares/error-handler';
import { downloadRouter } from './routes/download';

const app = express();

app.use(cors());
app.use(json());

app.use(downloadRouter);

const port = config.port;
app.listen(port, () => console.log(`Listening on ${port}`));
app.use(errorHandler);
