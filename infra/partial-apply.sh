#!/bin/bash

source .envrc

terraform init --reconfigure

terraform apply --target aws_ecr_repository.blog_ecr --auto-approve
terraform apply --target aws_s3_bucket.blog_portal_bucket --auto-approve