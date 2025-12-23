FROM node:25-alpine

WORKDIR /web

COPY package*.json tsconfig.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

