import cors from 'cors';
import express, { json } from 'express';
import { config } from '../config';
import { errorHandler } from './middlewares/error-handler';
import { downloadRouter } from './routes/downloadRouter';

const app = express();

app.use(cors());
app.use(json({ limit: '4.5mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(downloadRouter);

const port = config.port;
app.listen(port, () => console.log(`Listening on ${port}`));
app.use(errorHandler);
