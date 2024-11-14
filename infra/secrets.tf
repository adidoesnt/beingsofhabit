locals {
  formatted_timestamp = replace(timestamp(), ":", "-")
}

resource "random_password" "blog_docdb_password" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "blog_docdb_credentials" {
  name        = "blog/docdb-credentials-${local.formatted_timestamp}"
  description = "Secret for the Beings of Habit Blog Document DB credentials"

  tags = {
    Name = "blog-docdb-credentials"
  }
}

resource "aws_secretsmanager_secret_version" "blog_docdb_credentials_version" {
  secret_id = aws_secretsmanager_secret.blog_docdb_credentials.id
  secret_string = jsonencode({
    username = "root"
    password = random_password.blog_docdb_password.result
  })

  depends_on = [
    aws_secretsmanager_secret.blog_docdb_credentials,
    random_password.blog_docdb_password
  ]
}

resource "aws_secretsmanager_secret" "blog_docdb_uri" {
  name = "blog/docdb-uri-${local.formatted_timestamp}"

  tags = {
    Name = "blog-docdb-uri"
  }
}

resource "aws_secretsmanager_secret_version" "docdb_uri_version" {
  secret_id = aws_secretsmanager_secret.blog_docdb_uri.id
  secret_string = "mongodb://root:${random_password.blog_docdb_password.result}@${
    aws_docdb_cluster.blog_docdb_cluster.endpoint
  }:27017/?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"

  depends_on = [
    aws_secretsmanager_secret.blog_docdb_uri,
    aws_docdb_cluster.blog_docdb_cluster,
    random_password.blog_docdb_password
  ]
}

resource "aws_secretsmanager_secret" "blog_header_image_bucket_credentials" {
  name = "blog/header-image-bucket-credential-${local.formatted_timestamp}"

  tags = {
    Name = "blog-header-image-bucket-credentials"
  }
}

resource "aws_secretsmanager_secret_version" "header_image_bucket_credentials_version" {
  secret_id = aws_secretsmanager_secret.blog_header_image_bucket_credentials.id
  secret_string = jsonencode({
    access_key = aws_iam_access_key.s3_user_access_key.id
    secret_key = aws_iam_access_key.s3_user_access_key.secret
  })

  depends_on = [
    aws_secretsmanager_secret.blog_header_image_bucket_credentials,
    aws_iam_access_key.s3_user_access_key
  ]
}

resource "random_password" "blog_jwt_secret" {
  length  = 16
  special = true
}

resource "aws_secretsmanager_secret" "blog_jwt_secret" {
  name = "blog/jwt-secret-${local.formatted_timestamp}"

  tags = {
    Name = "blog-jwt-secret"
  }
}

resource "aws_secretsmanager_secret_version" "blog_jwt_secret_version" {
  secret_id     = aws_secretsmanager_secret.blog_jwt_secret.id
  secret_string = random_password.blog_jwt_secret.result

  depends_on = [aws_secretsmanager_secret.blog_jwt_secret, random_password.blog_jwt_secret]
}

variable "blog_user1_username" {
  type    = string
}

variable "blog_user1_password" {
  type    = string
}

resource "aws_secretsmanager_secret" "blog_user1_credentials" {
  name = "blog/user1-credentials-${local.formatted_timestamp}"

  tags = {
    Name = "blog-user1-credentials"
  }
}

resource "aws_secretsmanager_secret_version" "user1_credentials_version" {
  secret_id     = aws_secretsmanager_secret.blog_user1_credentials.id
  secret_string = jsonencode({
    username = var.blog_user1_username
    password = var.blog_user1_password
  })

  depends_on = [
    aws_secretsmanager_secret.blog_user1_credentials,
    var.blog_user1_username,
    var.blog_user1_password
  ]
}

variable "blog_user2_username" {
  type    = string
}

variable "blog_user2_password" {
  type    = string
}

resource "aws_secretsmanager_secret" "blog_user2_credentials" {
  name = "blog/user2-credentials-${local.formatted_timestamp}"

  tags = {
    Name = "blog-user2-credentials"
  }
}

resource "aws_secretsmanager_secret_version" "user2_credentials_version" {
  secret_id     = aws_secretsmanager_secret.blog_user2_credentials.id
  secret_string = jsonencode({
    username = var.blog_user2_username
    password = var.blog_user2_password
  })

  depends_on = [
    aws_secretsmanager_secret.blog_user2_credentials,
    var.blog_user2_username,
    var.blog_user2_password
  ]
}
