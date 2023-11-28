ARG NODE_IMAGE=node:16.13.1-alpine
ARG PORT=3333

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./package-lock.json ./
RUN npm ci

FROM base AS dependencies
ARG PORT
COPY --chown=node:node . .
ENV PORT=$PORT

FROM dependencies AS build
ARG PORT
RUN node ace build --production

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
