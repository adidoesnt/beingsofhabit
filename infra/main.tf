variable "aws_profile" {
  type    = string
}

variable "aws_region" {
  type    = string
}

provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}