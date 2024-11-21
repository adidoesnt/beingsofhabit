provider "aws" {
  profile = "default"
  region  = "ap-southeast-1"
}

terraform {
  backend "s3" {
    bucket = "boh-tf-state-bucket"
    key    = "infra/terraform.tfstate"
    region = "ap-southeast-1"
    profile = "default"

    dynamodb_table = "boh-tf-state-lock"
    encrypt        = true
  }
}

### Global variables ###
variable "main_website_url" {
  type = string
  default = "https://beingsofhabit.com"
}

variable "blog_portal_url" {
  type = string
  default = "https://admin.boh-services.com"
}

variable "blog_service_url" {
  type = string
  default = "https://blog.boh-services.com"
}
