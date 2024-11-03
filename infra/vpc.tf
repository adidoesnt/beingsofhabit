variable "main_vpc" {
    type = object({
      cidr_block = string
      name = string
    })

    default = {
      cidr_block = "10.0.0.0/16"
      name = "Beings of Habit VPC"
    }
}

variable "igw_name" {
  type    = string
  default = "Beings of Habit Internet Gateway"
}

variable "public_subnet_a" {
    type = object({
      name = string
      cidr_block = string
      availability_zone = string
    })

    default = {
      name = "Beings of Habit Public Subnet A"
      cidr_block = "10.0.0.0/20"
      availability_zone = "ap-southeast-1a"
    }
}

variable "public_subnet_b" {
    type = object({
      name = string
      cidr_block = string
      availability_zone = string
    })

    default = {
      name = "Beings of Habit Public Subnet B"
      cidr_block = "10.0.16.0/20"
      availability_zone = "ap-southeast-1b"
    }
}

variable "route_table_name" {
    type = string
    default = "Beings of Habit Public Route Table"
}

resource "aws_vpc" "main" {
  cidr_block = var.main_vpc.cidr_block
  enable_dns_hostnames = false
  enable_dns_support = true
  tags = {
    Name = var.main_vpc.name
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = var.igw_name
  }
}

resource "aws_subnet" "public_a" {
  vpc_id = aws_vpc.main.id
  cidr_block = var.public_subnet_a.cidr_block
  map_public_ip_on_launch = false
  availability_zone = var.public_subnet_a.availability_zone

  tags = {
    Name = var.public_subnet_a.name
  }
}

resource "aws_subnet" "public_b" {
  vpc_id = aws_vpc.main.id
  cidr_block = var.public_subnet_b.cidr_block
  map_public_ip_on_launch = false
  availability_zone = var.public_subnet_b.availability_zone

  tags = {
    Name = var.public_subnet_b.name
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = var.route_table_name
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}