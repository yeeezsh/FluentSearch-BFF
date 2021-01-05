
FROM node:14-slim AS dev
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
COPY . .
VOLUME . .
CMD ["yarn", "start:dev"]
EXPOSE 3000

FROM node:14-slim AS prod
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install
COPY . .
RUN yarn build
CMD [ "yarn", "start:prod" ]
EXPOSE 3000
