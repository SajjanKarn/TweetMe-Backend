FROM node:lts-alpine3.12
WORKDIR /app

COPY package*.json .
COPY yarn*.lock .
RUN yarn

COPY . .
EXPOSE 8000
CMD [ "yarn", "start" ]