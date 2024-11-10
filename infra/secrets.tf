resource "random_password" "blog_docdb_password" {
  length  = 16
  special = true
}

resource "aws_secretsmanager_secret" "blog_docdb_credentials" {
  name        = "blog-docdb/credentials"
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
  name = "blog/docdb_uri"

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
  name = "blog/header_image_bucket_credentials"

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
  name = "blog/jwt_secret"

  tags = {
    Name = "blog-jwt-secret"
  }
}

resource "aws_secretsmanager_secret_version" "blog_jwt_secret_version" {
  secret_id     = aws_secretsmanager_secret.blog_jwt_secret.id
  secret_string = random_password.blog_jwt_secret.result

  depends_on = [aws_secretsmanager_secret.blog_jwt_secret, random_password.blog_jwt_secret]
}
