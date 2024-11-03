variable "blog_docdb_secret" {
  type = object({
    name        = string
    secret_name = string
    description = string
  })

  default = {
    name        = "Blog Document DB credentials"
    secret_name = "blog/docdb_credentials"
    description = "Secret for the Beings of Habit Blog Document DB"
  }
}

variable "blog_docdb_uri_secret" {
  type = object({
    name        = string
    secret_name = string
    description = string
  })

  default = {
    name        = "Blog Document DB URI"
    secret_name = "blog/docdb_uri"
    description = "Secret for the Beings of Habit Blog Document DB URI"
  }
}

variable "blog_jwt_secret" {
  type = object({
    name        = string
    secret_name = string
    description = string
  })

  default = {
    name        = "Blog JWT secret"
    secret_name = "blog/jwt_secret"
    description = "Secret for the Beings of Habit Blog JWT secret"
  }
}

resource "random_password" "blog_docdb_password" {
  length  = 16
  special = true
}

resource "random_password" "blog_jwt_secret_value" {
  length  = 16
  special = true
}

resource "aws_secretsmanager_secret" "blog_docdb_credentials" {
  name        = var.blog_docdb_secret.secret_name
  description = var.blog_docdb_secret.description

  tags = {
    Name = var.blog_docdb_secret.name
  }
}

resource "aws_secretsmanager_secret_version" "blog_docdb_credentials_version" {
  secret_id = aws_secretsmanager_secret.blog_docdb_credentials.id
  secret_string = jsonencode({
    username = var.blog_docdb_username
    password = random_password.blog_docdb_password.result
  })

  depends_on = [ aws_secretsmanager_secret.blog_docdb_credentials ]
}

data "aws_secretsmanager_secret" "blog_docdb_credentials" {
  name = var.blog_docdb_secret.secret_name

  depends_on = [aws_secretsmanager_secret.blog_docdb_credentials]
}

data "aws_secretsmanager_secret_version" "blog_docdb_credentials_version" {
  secret_id = data.aws_secretsmanager_secret.blog_docdb_credentials.id

  depends_on = [aws_secretsmanager_secret_version.blog_docdb_credentials_version]
}

resource "aws_secretsmanager_secret" "blog_docdb_uri" {
  name        = var.blog_docdb_uri_secret.secret_name
  description = var.blog_docdb_uri_secret.description

  tags = {
    Name = var.blog_docdb_uri_secret.name
  }

  depends_on = [aws_docdb_cluster.blog_docdb_cluster]
}

resource "aws_secretsmanager_secret_version" "blog_docdb_uri_version" {
  secret_id = aws_secretsmanager_secret.blog_docdb_uri.id
  secret_string = "mongodb://${local.docdb_username}:${local.docdb_password}@${
    aws_docdb_cluster.blog_docdb_cluster.endpoint
  }:27017?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"

  depends_on = [
    aws_secretsmanager_secret.blog_docdb_uri,
    aws_docdb_cluster.blog_docdb_cluster,
    local.docdb_password,
    local.docdb_username
  ]
}

data "aws_secretsmanager_secret" "blog_docdb_uri" {
  name = var.blog_docdb_uri_secret.secret_name

  depends_on = [aws_secretsmanager_secret.blog_docdb_uri]
}

data "aws_secretsmanager_secret_version" "blog_docdb_uri_version" {
  secret_id = data.aws_secretsmanager_secret.blog_docdb_uri.id

  depends_on = [aws_secretsmanager_secret_version.blog_docdb_uri_version]
}

resource "aws_secretsmanager_secret" "blog_jwt_secret_secret" {
  name        = var.blog_jwt_secret.secret_name
  description = var.blog_jwt_secret.description

  tags = {
    Name = var.blog_jwt_secret.name
  }
}

resource "aws_secretsmanager_secret_version" "blog_jwt_secret_secret_version" {
  secret_id     = aws_secretsmanager_secret.blog_jwt_secret_secret.id
  secret_string = random_password.blog_jwt_secret_value.result

  depends_on = [ aws_secretsmanager_secret.blog_jwt_secret_secret ]
}

data "aws_secretsmanager_secret" "blog_jwt_secret_secret" {
  name = var.blog_jwt_secret.secret_name

  depends_on = [aws_secretsmanager_secret.blog_jwt_secret_secret]
}

data "aws_secretsmanager_secret_version" "blog_jwt_secret_secret_version" {
  secret_id = data.aws_secretsmanager_secret.blog_jwt_secret_secret.id

  depends_on = [aws_secretsmanager_secret_version.blog_jwt_secret_secret_version]
}
