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
    "environment" : [{
      "name" : "PORT",
      "value" : "3004"
      }, {
      "name" : "NODE_ENV",
      "value" : "PROD"
      }, {
      "name" : "JWT_SECRET",
      "valueFrom" : "${aws_secretsmanager_secret.blog_jwt_secret.arn}"
      }, {
      "name" : "MONGODB_URI",
      "valueFrom" : "${aws_secretsmanager_secret.blog_docdb_uri.arn}"
      }, {
      "name" : "MONGODB_DB_NAME",
      "value" : "blog"
      }, {
      "name" : "AWS_ACCESS_KEY_ID",
      "valueFrom" : "${aws_secretsmanager_secret.blog_docdb_credentials.arn}:access_key"
      }, {
      "name" : "AWS_SECRET_ACCESS_KEY",
      "valueFrom" : "${aws_secretsmanager_secret.blog_docdb_credentials.arn}:secret_key"
      }, {
      "name" : "AWS_REGION",
      "value" : "ap-southeast-1"
      }, {
      "name" : "BUCKET_ENDPOINT",
      "value" : "${aws_s3_bucket.blog_header_image_bucket.bucket_domain_name}"
      }, {
      "name" : "BUCKET_NAME",
      "value" : "${aws_s3_bucket.blog_header_image_bucket.bucket}"
      }, {
      "name" : "URL_EXPIRY_IN_SECONDS",
      "value" : "120"
      }, {
      "name" : "WEBSITE_URL",
      "value" : "TODO"
      }, {
      "name" : "BLOG_PORTAL_URL",
      "value" : "TODO"
      }, {
      "name" : "BLOG_URL",
      "value" : "TODO"
    }]
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
    aws_iam_role.ecs_task_execution_role,
    aws_secretsmanager_secret.blog_docdb_uri,
    aws_secretsmanager_secret.blog_jwt_secret,
    aws_secretsmanager_secret.blog_docdb_credentials,
    aws_s3_bucket.blog_header_image_bucket
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

  load_balancer {
    target_group_arn = aws_lb_target_group.blog_target_group.arn
    container_name   = "blog"
    container_port   = 3004
  }

  tags = {
    Name = "blog"
  }

  depends_on = [
    aws_ecs_cluster.blog_ecs_cluster,
    aws_ecs_task_definition.blog_task_definition,
    aws_security_group.blog_service_sg,
    aws_subnet.public_subnet_a,
    aws_subnet.public_subnet_b,
    aws_lb_target_group.blog_target_group
  ]
}
