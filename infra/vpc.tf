resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = false
}

resource "aws_internet_gateway" "main_igw" {
  vpc_id = aws_vpc.main_vpc.id

  tags = {
    name = "Beings of Habit IGW"
  }

  depends_on = [aws_vpc.main_vpc]
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.0.0/20"
  map_public_ip_on_launch = false
  availability_zone       = "ap-southeast-1a"

  tags = {
    name = "Beings of Habit Public Subnet A"
  }

  depends_on = [aws_vpc.main_vpc]
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.main_vpc.id
  cidr_block              = "10.0.16.0/20"
  map_public_ip_on_launch = false
  availability_zone       = "ap-southeast-1b"

  tags = {
    name = "Beings of Habit Public Subnet B"
  }

  depends_on = [aws_vpc.main_vpc]
}

resource "aws_route_table" "main_route_table" {
  vpc_id = aws_vpc.main_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main_igw.id
  }

  tags = {
    name = "Beings of Habit Public Route Table"
  }

  depends_on = [aws_internet_gateway.main_igw]
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.main_route_table.id

  depends_on = [aws_route_table.main_route_table, aws_subnet.public_subnet_a]
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_subnet_b.id
  route_table_id = aws_route_table.main_route_table.id

  depends_on = [aws_route_table.main_route_table, aws_subnet.public_subnet_b]
}
