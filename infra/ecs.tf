resource "aws_ecs_cluster" "blog_ecs_cluster" {
  name = "blog-ecs-cluster"
}

resource "aws_ecs_task_definition" "blog_task_definition" {
  family = "blog-task-definition"
  container_definitions = jsonencode([{
    "name" : "blog",
    "image" : "${aws_ecr_repository.blog_ecr.repository_url}:latest",
    "essential" : true,
    "portMappings" : [{
      "containerPort" : 3004,
      "hostPort" : 3004
    }],
  }])
  memory                   = "512"
  cpu                      = "256"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn

  tags = {
    Name = "Beings of Habit Blog Task Definition"
  }

  depends_on = [
    aws_ecr_repository.blog_ecr,
    aws_iam_role.ecs_task_execution_role
  ]
}
