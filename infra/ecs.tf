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

resource "aws_ecs_service" "blog_service" {
  name             = "blog"
  cluster          = aws_ecs_cluster.blog_ecs_cluster.id
  task_definition  = aws_ecs_task_definition.blog_task_definition.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "LATEST"

  network_configuration {
    subnets          = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
    security_groups  = [aws_security_group.blog_service_sg.id]
    assign_public_ip = true
  }

  # TODO: add load balancer

  tags = {
    Name = "blog"
  }

  depends_on = [
    aws_ecs_cluster.blog_ecs_cluster,
    aws_ecs_task_definition.blog_task_definition,
    aws_security_group.blog_service_sg,
    aws_subnet.public_subnet_a,
    aws_subnet.public_subnet_b
  ]
}
