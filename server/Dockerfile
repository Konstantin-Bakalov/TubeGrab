FROM node:20-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]