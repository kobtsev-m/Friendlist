#!/bin/sh

yarn install --frozen-lockfile
yarn migration:run

cp yarn.lock yarn.lock.orig
rm -rf node_modules

echo | amplify push 2>&1 | tee -a amplify-push.log

rm -rf package-lock.json node_modules
mv yarn.lock.orig yarn.lock

yarn install --production --frozen-lockfile
