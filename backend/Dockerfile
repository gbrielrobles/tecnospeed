FROM node:24.0.0-slim
WORKDIR /src
COPY package*.json .
RUN npm install 
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get update && apt-get install -y procps
COPY . .  

RUN npx prisma generate
RUN npm run database:seed

EXPOSE 8000
CMD ["npm", "run", "start:dev"]