
FROM node:15.13-alpine3.13 AS dev
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
CMD ["yarn", "start:dev"]

FROM node:15.13-alpine3.13 AS prod
COPY package.json package.json
RUN yarn install
ADD . .
RUN yarn build
CMD [ "yarn", "start:prod" ]