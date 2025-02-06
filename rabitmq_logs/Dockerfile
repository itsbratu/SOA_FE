FROM node:16-alpine

WORKDIR /rabitmq_logs/src

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start:prod"]
