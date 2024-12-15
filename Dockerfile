FROM node:20-slim

EXPOSE 8600

WORKDIR /root/retro-env-can-weather-chan
RUN apt update && apt install git tini -y

RUN git clone https://github.com/dj2999/retro-weather-chan ./
RUN yarn install
RUN yarn build:display

# Using tini ensures ctrl+c works.
ENTRYPOINT ["tini", "--"]
CMD [ "yarn", "start" ]
