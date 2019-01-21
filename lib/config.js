require('dotenv').config();
const convict = require('convict');

var config = convict({
  env: {
    doc: 'The app environment.',
    format: ['prod', 'test', 'dev'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  twitter: {
    consumer_key: {
      format: String,
      default: '',
      env: 'CONSUMER_KEY'
    },
    consumer_secret: {
      format: String,
      default: '',
      env: 'CONSUMER_SECRET',
    },
    access_token: {
      format: String,
      default: '',
      env: 'ACCESS_TOKEN'
    },
    access_token_secret: {
      format: String,
      default: '',
      env: 'ACCESS_TOKEN_SECRET'
    },
    timeout_ms: {
      default: 60*1000
    },
    strictSSL: {
      default: true
    }

  },
  mongodb: {
    url: {
      format: String,
      env: 'TRADING_DB_URL',
      arg: 'url',
      default: 'mongodb://localhost:27017/testing' 
    },
    server: {
      format: String,
      default: 'localhost',
      arg: 'server',
      env: 'TRADING_DB_SERVER',
    },
    port: {
      format: Number,
      default: 27017,
      arg: 'port',
      env: 'TRADING_DB_PORT'
    },
    db: {
      format: String,
      default: 'testing',
      arg: 'db',
      env: 'TRADING_DB_NAME',
    },
    collection: {
      format: String,
      default: 'twit_timeline',
      env: 'TRADING_DB_COL',
      arg: 'collection'
    }
  },
  redis: {
    server: {
      format: String,
      default: 'localhost',
      arg: 'serverred'
    }
  }

});

const env = config.get('env');
config.loadFile(`${env}.json`);

module.exports = config;

