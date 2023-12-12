#!/bin/bash

# Get the current timestamp
timestamp=$(date +"%Y%m%d%H%M%S")

git pull

rm -rf node_modules

npm install --force

ng build

git add .

git commit -am "Deploy $timestamp"

git push -u origin main

eb deploy