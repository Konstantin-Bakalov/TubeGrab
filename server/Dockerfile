FROM node:20-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build
CMD ["node", "./dist/src/index.js"]