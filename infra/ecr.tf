variable "blog_repository_config" {
    type = object({
      name = string
    })

    default = {
      name = "blog-repository"
    }
}

resource "aws_ecr_repository" "blog_repository" {
    name = var.blog_repository_config.name

    image_scanning_configuration {
        scan_on_push = true
    }
}

variable "blog_cluster_config" {
  type = object({
    name = string
  })

  default = {
    name = "beings-of-habit-blog-ecs-cluster"
  }
}

resource "aws_ecs_cluster" "blog_cluster" {
  name = var.blog_cluster_config.name
}
