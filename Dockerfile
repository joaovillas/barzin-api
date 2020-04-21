FROM node:alpine
WORKDIR /usr/app

COPY package.json .
COPY . .
COPY .env.example .

RUN yarn 
RUN cp .env.example .env
EXPOSE 8080