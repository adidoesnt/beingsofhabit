variable "aws_profile" {
  type    = string
}

variable "aws_region" {
  type    = string
}

variable "blog_service_port" {
  type    = number
  default = 3004
}

provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}
