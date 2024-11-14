variable "blog_service_certificate_arn" {
  type = string
  default = "arn:aws:acm:ap-southeast-1:839459181456:certificate/3bfb7ce0-2b0f-4193-9820-d5886f763754"
}

resource "aws_lb" "blog_alb" {
  name                       = "blog-alb"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.blog_service_sg.id]
  subnets                    = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
  enable_deletion_protection = false

  tags = {
    Name = "Beings of Habit Blog ALB"
  }

  depends_on = [
    aws_security_group.blog_service_sg,
    aws_subnet.public_subnet_a,
    aws_subnet.public_subnet_b
  ]
}

resource "aws_lb_target_group" "blog_target_group" {
  name     = "blog-target-group"
  port     = 3004
  protocol = "HTTP"
  vpc_id   = aws_vpc.main_vpc.id
  target_type = "ip"

  health_check {
    interval = 300
    enabled  = true
    path     = "/health"
    port     = 3004
    protocol = "HTTP"
  }

  tags = {
    Name = "Beings of Habit Blog Target Group"
  }

  depends_on = [aws_vpc.main_vpc]
}

resource "aws_alb_listener" "blog_http_listener" {
  load_balancer_arn = aws_lb.blog_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blog_target_group.arn
  }

  depends_on = [aws_lb.blog_alb, aws_lb_target_group.blog_target_group]
}

resource "aws_alb_listener" "blog_https_listener" {
  load_balancer_arn = aws_lb.blog_alb.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = var.blog_service_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blog_target_group.arn
  }

  depends_on = [aws_lb.blog_alb, aws_lb_target_group.blog_target_group]
}
