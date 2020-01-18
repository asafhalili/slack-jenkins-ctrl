FROM node:13

ADD . /app
WORKDIR /app

RUN ["npm", "run", "build"]

ENTRYPOINT [ "npm", "run", "start" ]