FROM node:16.13.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8003
CMD [ "npx", "nodemon", "server.js" ]