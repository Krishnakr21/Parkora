#!/bin/bash

# Use this to redeploy the api in the server.

docker pull krishna/parkora:latest

# Check if the container is running
if [ "$(docker ps -q -f name=parkora)" ]; then
    docker stop parkora
    docker rm parkora
fi

# Check if the container exists but it's not running
if [ "$(docker ps -aq -f status=exited -f name=parkora)" ]; then
    docker rm parkora
fi

docker run -d --restart=on-failure --env-file .env -p 3006:3000 --name parkora krishna/parkora
