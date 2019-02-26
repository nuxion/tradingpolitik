FROM node:8 as builder
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

from node:8
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
#ENV ACCESS_TOKEN
#ENV ACCESS_TOKEN_SECRET
#ENV CONSUMER_KEY
#ENV CONSUMER_SECRET
ENV NODE_ENV="prod"
ENV TRADING_DB_COL="testing_docker"
ENV TWITTER_PROFILE="test"
ENTRYPOINT ["npx", "app-cli", "docker", "-D"]
