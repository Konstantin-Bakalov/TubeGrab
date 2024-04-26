import cors from 'cors';
import express, { json } from 'express';
import { config } from '../config';
import { errorHandler } from './middlewares/error-handler';
import { downloadRouter } from './routes/downloadRouter';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
export const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(json());

app.use(downloadRouter);

const port = config.port;
server.listen(port, () => console.log(`Listening on ${port}`));
app.use(errorHandler);
