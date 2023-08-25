FROM node:16-alpine as builder

LABEL authors="Usman Ogunsola"

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
