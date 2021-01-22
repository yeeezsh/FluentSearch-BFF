
FROM node:14.15.3-alpine3.10 AS dev
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
CMD ["yarn", "start:dev"]

FROM node:14.15.3-alpine3.10 AS prod
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
RUN yarn build
CMD [ "yarn", "start:prod" ]