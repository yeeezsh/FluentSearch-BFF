
FROM node:15.14.0-stretch AS dev
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
CMD ["yarn", "start:dev"]

FROM node:15.14.0-stretch AS prod
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
ADD . .
RUN yarn build
CMD [ "yarn", "start:prod" ]