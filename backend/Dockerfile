FROM node:24.0.0-slim
WORKDIR /src
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get update && apt-get install -y procps
RUN npm install -g yarn --force

COPY package*.json .
RUN yarn install 

COPY . .  

RUN yarn prisma generate
RUN yarn run database:seed

EXPOSE 8000
CMD yarn prisma generate && yarn run start:dev