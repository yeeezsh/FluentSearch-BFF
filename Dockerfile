
FROM node:14-slim AS dev
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
VOLUME . .
CMD ["yarn", "start:dev"]
EXPOSE 3000

FROM node:14-slim AS build
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
RUN yarn build
WORKDIR /dist
CMD ["node", "main.js"]
EXPOSE 3000
