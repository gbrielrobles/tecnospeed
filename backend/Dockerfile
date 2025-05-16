FROM node:24.0.0-slim
WORKDIR /src
RUN apt-get update -y && apt-get install -y openssl
RUN apt-get update && apt-get install -y procps
RUN npm install -g yarn --force

RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fontconfig \
    libfontconfig1 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxext6 \
    libxss1 \
    libnss3 \
    libgdk-pixbuf2.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libxtst6 \
    libpci3 \
    libappindicator3-1 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json .
RUN yarn install 
RUN yarn add puppeteer    

COPY . .  

RUN yarn prisma generate
RUN yarn run database:seed

EXPOSE 8000
CMD yarn prisma generate && yarn run start:dev