# VO2-Asteroid-mining-taro

VO2 Frontend Assignment

# How to run the project

install dependencies: `yarn`  
start development run: `yarn dev:weapp`  
start build: `yarn build:weapp`

# Necessary Middleware

It's necessary to convert `socket.io` protocol to standard `websocket` protocol since `socket.io` support is broken for miniprograms. We use [a middleware](https://github.com/ArtemisSaber/Socket.io-Middleware) to do the job.

# Configurations

Config `/src/config.ts` first.  
`BASE_URL` for REST API endpoint base and `WS_URL` for WS endpoint provided by [middleware](https://github.com/ArtemisSaber/Socket.io-Middleware) mentioned above
