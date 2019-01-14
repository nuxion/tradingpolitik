#!/usr/bin/env node
const MongoClient = require('mongodb').MongoClient;

async function createIndex(options) {
  const client = new MongoClient(options.url, { useNewUrlParser: true });

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(options.db);
    // console.log(db);
    const col = db.collection(options.collection);
    const r = await col.createIndex({ id_str: 1 }, { unique: true });
    console.log(r);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
}

async function drop(options) {
  const client = new MongoClient(options.url, { useNewUrlParser: true });

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(options.db);
    // console.log(db);
    const col = db.collection(options.collection);
    const r = await col.drop();
    console.log(r);
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
}
// Main
/*
const params = {
  url: 'mongodb://172.21.0.2:27017/testing',
  db: 'testing',
  collection: 'test_docker',
};

createIndex(params).then(() => console.log('Done.')).catch(e => console.log(e));
*/
module.exports = { createIndex, drop };
