resource "aws_cloudwatch_log_group" "blog_service_log_group" {
  name              = "/ecs/blog-service"
  retention_in_days = 30

  tags = {
    Name = "Beings of Habit Blog Service Log Group"
  }
}