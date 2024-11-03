variable "blog_docdb_secret" {
    type = object({
      name = string
      secret_name = string
      description = string
    })

    default = {
      name = "Blog Document DB credentials"
      secret_name = "blog/docdb_credentials"
      description = "Secret for the Beings of Habit Blog Document DB"
    }
}

resource "random_password" "blog_docdb_password" {
  length  = 16
  special = true
}

resource "aws_secretsmanager_secret" "blog_docdb_credentials" {
  name = var.blog_docdb_secret.secret_name
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
}

