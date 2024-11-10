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
