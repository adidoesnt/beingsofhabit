variable "blog_service" {
    type = object({
      name = string
      description = string
    })

    default = {
      name = "Beings of Habit Blog Service Security Group"
      description = "Security group for the Beings of Habit Blog Service"
    }
}

resource "aws_security_group" "blog_service_sg" {
    name = var.blog_service.name
    description = var.blog_service.description
    vpc_id = aws_vpc.main.id

    ingress {
        description = "Allow HTTP"
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow HTTPS"
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow custom TCP"
        from_port = var.blog_service_port
        to_port = var.blog_service_port
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "Allow all outgoing traffic"
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = var.blog_service.name
    }
}

variable "blog_docdb" {
    type = object({
      name = string
      description = string
      port = number
    })

    default = {
      name = "Beings of Habit Blog Document DB Security Group"
      description = "Security group for the Beings of Habit Blog Document DB"
      port = 27017
    }
}

resource "aws_security_group" "blog_docdb_sg" {
    name = var.blog_docdb.name
    description = var.blog_docdb.description
    vpc_id = aws_vpc.main.id

    ingress {
        description = "Allow MongoDB access from the Blog Service"
        from_port = var.blog_docdb.port
        to_port = var.blog_docdb.port
        protocol = "tcp"
        security_groups = [aws_security_group.blog_service_sg.id]
    }

    egress {
        description = "Allow all outgoing traffic"
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = var.blog_docdb.name
    }
}
