FROM node:20-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .
EXPOSE 80
CMD ["npm", "run", "start"]