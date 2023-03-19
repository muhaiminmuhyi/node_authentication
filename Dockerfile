FROM node:16.13.1

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", ".env", "./"]

COPY . .

RUN npm install

EXPOSE 8003
CMD [ "npx", "nodemon", "server.js" ]