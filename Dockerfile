FROM node:8-alpine as builder
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

from node:8-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
ENV NODE_ENV="prod"
ENTRYPOINT ["node", "bin/app-cli"]
#CMD ["--help"]
