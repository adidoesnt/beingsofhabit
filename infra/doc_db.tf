resource "aws_docdb_subnet_group" "blog_docdb_subnet_group" {
  name        = "blog-docdb-subnet-group"
  description = "Subnet group for the Beings of Habit Blog Document DB"
  subnet_ids  = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]

  tags = {
    Name = "Beings of Habit Blog Document DB Subnet Group"
  }

  depends_on = [aws_subnet.public_subnet_a, aws_subnet.public_subnet_b]
}

resource "aws_docdb_cluster" "blog_docdb_cluster" {
  cluster_identifier  = "beingsofhabit-blog-docdb-cluster"
  engine              = "docdb"
  master_username     = "root"
  master_password     = random_password.blog_docdb_password.result
  skip_final_snapshot = true

  vpc_security_group_ids = [aws_security_group.blog_docdb_sg.id]
  db_subnet_group_name   = aws_docdb_subnet_group.blog_docdb_subnet_group.name

  tags = {
    Name = "Beings of Habit Blog Document DB Cluster"
  }

  depends_on = [
    aws_security_group.blog_docdb_sg,
    aws_docdb_subnet_group.blog_docdb_subnet_group,
    random_password.blog_docdb_password
  ]
}

resource "aws_docdb_cluster_instance" "blog_docdb_instance" {
  identifier         = "beingsofhabit-blog-docdb-instance"
  cluster_identifier = aws_docdb_cluster.blog_docdb_cluster.id
  instance_class     = "db.t3.medium"
  apply_immediately  = true

  tags = {
    Name = "Beings of Habit Blog Document DB Instance"
  }

  depends_on = [aws_docdb_cluster.blog_docdb_cluster]
}


