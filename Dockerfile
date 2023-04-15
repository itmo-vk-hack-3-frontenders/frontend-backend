FROM node:18-alpine as base
WORKDIR /hack
COPY app/package.json .
COPY app/yarn.lock .
RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN yarn install --frozen-lockfile


FROM base AS app
COPY app .
CMD ["yarn", "serve"]
