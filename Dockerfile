FROM node:16-slim

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 4002

ENTRYPOINT ["tail", "-f", "/dev/null"]