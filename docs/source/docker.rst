docker run -e TRADING_DB_URL=mongodb://tradingpolitik_politik-mongo_1:27017/testing -e NODE_ENV=prod --net tradingpolitik_politik  --link 7404717ce60c nuxion/trading  test -D
