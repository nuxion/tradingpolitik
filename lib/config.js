module.exports = {
	twitter: {
		consumer_key: '',
		consumer_secret: '',
		access_token: '',
		access_token_secret: '',
		timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
		strictSSL: true,     // optional - requires SSL certificates to be valid.
	},
	mongodb: {
    url: 'mongodb://localhost:27017/testing' || process.env.TRADING_DB_URL,
    server: 'localhost' || process.env.TRADING_DB_SERVER,
    port: 27017 || parseInt(process.env.TRADING_DB_PORT, 10),
    db: 'testing' || process.env.TRADING_DB_NAME,
    collection: 'test_docker' || process.env.TRADING_DB_COL,
	},
	redis: {
		server: 'localhost'
	}
};
