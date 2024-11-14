resource "aws_ecr_repository" "blog_ecr" {
  name = "blog-repo"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "Beings of Habit Blog ECR"
  }
}
