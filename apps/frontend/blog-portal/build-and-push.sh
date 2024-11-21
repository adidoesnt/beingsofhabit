#!/bin/bash

bun run build

aws s3 sync ./dist/ s3://blog-portal-deployment-bucket/
