FROM node:20-alpine

WORKDIR /usr/src/rune

COPY . /usr/src/rune

RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run"]