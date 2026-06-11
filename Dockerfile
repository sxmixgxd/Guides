FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx quartz plugin install && \
    curl -sSL https://raw.githubusercontent.com/jackyzha0/quartz/main/quartz/util/emojimap.json -o quartz/util/emojimap.json && \
    npx quartz build

FROM nginx:alpine
COPY --from=0 /usr/src/app/public /usr/share/nginx/html
EXPOSE 80
