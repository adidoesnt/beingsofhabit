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
