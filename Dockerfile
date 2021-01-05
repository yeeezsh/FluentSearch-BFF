
FROM node:14-slim AS dev
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
COPY . .
VOLUME . .
CMD ["yarn", "start:dev"]
EXPOSE 3000

FROM node:14-slim AS build
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
COPY . .
CMD [ "yarn", "start" ]
EXPOSE 3000
