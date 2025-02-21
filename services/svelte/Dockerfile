ARG NODE_VERSION=current
ARG FRONTEND_DIRECTORY

# Builder
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY ${FRONTEND_DIRECTORY} .

RUN npm install

RUN cp .env.example .env

RUN npm run build


# Dev
FROM node:${NODE_VERSION}-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]


# Prod
FROM node:${NODE_VERSION}-alpine AS prod

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env ./env

RUN npm install --only=production

CMD ["node", "--env-file=.env", "build"]