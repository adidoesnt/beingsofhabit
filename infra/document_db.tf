locals {
  docdb_username = jsondecode(data.aws_secretsmanager_secret_version.blog_docdb_credentials_version.secret_string)["username"]
  docdb_password = jsondecode(data.aws_secretsmanager_secret_version.blog_docdb_credentials_version.secret_string)["password"]

  depends_on = [
    aws_secretsmanager_secret_version.blog_docdb_credentials_version
  ]
}

variable "blog_docdb_subnet_group_config" {
  type = object({
    name        = string
    description = string
  })

  default = {
    name        = "beingsofhabit-blog-docdb-cluster-subnet-group"
    description = "Subnet group for the Beings of Habit Blog Document DB"
  }
}

resource "aws_docdb_subnet_group" "blog_docdb_subnet_group" {
  name        = var.blog_docdb_subnet_group_config.name
  description = var.blog_docdb_subnet_group_config.description
  subnet_ids  = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

variable "blog_docdb_cluster_config" {
  type = object({
    name               = string
    cluster_identifier = string
    engine             = string
  })

  default = {
    name               = "Beings of Habit Blog Document DB Cluster"
    cluster_identifier = "beingsofhabit-blog-docdb-cluster"
    engine             = "docdb"
  }
}

resource "aws_docdb_cluster" "blog_docdb_cluster" {
  cluster_identifier  = var.blog_docdb_cluster_config.cluster_identifier
  engine              = var.blog_docdb_cluster_config.engine
  master_username     = local.docdb_username
  master_password     = local.docdb_password
  skip_final_snapshot = true

  vpc_security_group_ids = [aws_security_group.blog_docdb_sg.id]
  db_subnet_group_name   = aws_docdb_subnet_group.blog_docdb_subnet_group.name

  tags = {
    Name = var.blog_docdb_cluster_config.name
  }
}

variable "blog_docdb_instance_config" {
  type = object({
    identifier        = string
    instance_class    = string
    apply_immediately = bool
  })

  default = {
    identifier        = "beingsofhabit-blog-docdb-instance"
    instance_class    = "db.t3.medium"
    apply_immediately = true
  }
}

resource "aws_docdb_cluster_instance" "main_instance" {
  identifier         = var.blog_docdb_instance_config.identifier
  cluster_identifier = aws_docdb_cluster.blog_docdb_cluster.id
  instance_class     = var.blog_docdb_instance_config.instance_class
  apply_immediately  = var.blog_docdb_instance_config.apply_immediately
}
