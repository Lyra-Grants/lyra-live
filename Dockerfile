FROM node:16
WORKDIR /front-end
COPY . .
RUN yarn install && yarn add --dev typescript && yarn upgrade
EXPOSE 3000