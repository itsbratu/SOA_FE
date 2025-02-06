FROM node:18 AS build

WORKDIR /redis_updater/src

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

ENV REDIS_HOST=redis_instance_1
ENV REDIS_PORT=6379

EXPOSE 3002

CMD ["npm", "run", "start:prod"]
