FROM node:23-slim
WORKDIR /src
COPY package*.json .
RUN yarn install 
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get update && apt-get install -y procps
COPY . .  

EXPOSE 8000
CMD ["yarn", "run", "start:dev"]
