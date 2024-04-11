import { config as envConfig } from 'dotenv';

envConfig();

const config = {
  port: process.env.SERVER_PORT,
};

export { config };
