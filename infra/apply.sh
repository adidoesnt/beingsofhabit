#!/bin/bash

source .envrc

terraform init --reconfigure

terraform apply --auto-approve
