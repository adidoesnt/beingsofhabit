provider "aws" {
  profile = "boh"
  region  = "ap-southeast-1"
}

terraform {
  backend "s3" {
    bucket = "boh-tf-state-bucket"
    key    = "infra/terraform.tfstate"
    region = "ap-southeast-1"
    profile = "boh"

    dynamodb_table = "boh-tf-state-lock"
    encrypt        = true
  }
}
