#!/bin/sh

yarn install --frozen-lockfile
yarn migration:run

cp yarn.lock yarn.lock.orig
rm -rf node_modules

cd ../../../../../

echo | amplify push 2>&1 | tee -a amplify-push.log

cd amplify/backend/function/friendlist/src

rm -rf package-lock.json node_modules
mv yarn.lock.orig yarn.lock

yarn install --production --frozen-lockfile
