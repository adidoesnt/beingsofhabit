resource "aws_security_group" "blog_service_sg" {
  name        = "blog-service-sg"
  description = "Security group for the Beings of Habit Blog Service"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow custom TCP"
    from_port   = 3004
    to_port     = 3004
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outgoing traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  depends_on = [aws_vpc.main_vpc]

  tags = {
    Name = "blog-service-sg"
  }
}

resource "aws_security_group" "blog_docdb_sg" {
  name        = "blog-docdb-sg"
  description = "Security group for the Beings of Habit Blog Document DB"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    description     = "Allow MongoDB access from the Blog Service"
    from_port       = 27017
    to_port         = 27017
    protocol        = "tcp"
    security_groups = [aws_security_group.blog_service_sg.id]
  }

  egress {
    description = "Allow all outgoing traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  depends_on = [
    aws_vpc.main_vpc,
    aws_security_group.blog_service_sg
  ]

  tags = {
    Name = "blog-docdb-sg"
  }
}

