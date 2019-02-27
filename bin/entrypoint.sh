#!/bin/sh
env

echo $TRADING_DB_URL
npm run cli -- test -D
