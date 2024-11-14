variable "blog_portal_url" {
  type = string
  default = "https://admin.boh-services.com"
}

variable "blog_service_url" {
  type = string
  default = "https://blog.boh-services.com"
}

variable "main_website_url" {
  type = string
  default = "https://beingsofhabit.com"
}

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
    "logConfiguration" : {
      "logDriver" : "awslogs",
      "options" : {
        "awslogs-group" : "/ecs/blog-service",
        "awslogs-region" : "ap-southeast-1",
        "awslogs-stream-prefix" : "ecs"
      }
    },
    "environment" : [{
      "name" : "PORT",
      "value" : "3004"
      }, {
      "name" : "NODE_ENV",
      "value" : "PROD"
      }, {
      "name" : "MONGODB_DB_NAME",
      "value" : "blog"
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
      "value" : var.main_website_url
      }, {
      "name" : "BLOG_PORTAL_URL",
      "value" : var.blog_portal_url
      }, {
      "name" : "BLOG_URL",
      "value" : var.blog_service_url
    }],
    "secrets" : [{
      "name" : "JWT_SECRET",
      "valueFrom" : "${aws_secretsmanager_secret.blog_jwt_secret.arn}"
      }, {
      "name" : "MONGODB_URI",
      "valueFrom" : "${aws_secretsmanager_secret.blog_docdb_uri.arn}"
      }, {
      "name" : "AWS_ACCESS_KEY_ID",
      "valueFrom" : "${aws_secretsmanager_secret.blog_header_image_bucket_credentials.arn}:access_key::"
      }, {
      "name" : "AWS_SECRET_ACCESS_KEY",
      "valueFrom" : "${aws_secretsmanager_secret.blog_header_image_bucket_credentials.arn}:secret_key::"
    }, {
      "name" : "USERNAME_1",
      "valueFrom" : "${aws_secretsmanager_secret.blog_user1_credentials.arn}:username::"
      }, {
      "name" : "PASSWORD_1",
      "valueFrom" : "${aws_secretsmanager_secret.blog_user1_credentials.arn}:password::"
      }, {
      "name" : "USERNAME_2",
      "valueFrom" : "${aws_secretsmanager_secret.blog_user2_credentials.arn}:username::"
      }, {
      "name" : "PASSWORD_2",
      "valueFrom" : "${aws_secretsmanager_secret.blog_user2_credentials.arn}:password::"
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
    aws_secretsmanager_secret.blog_header_image_bucket_credentials,
    aws_secretsmanager_secret.blog_user1_credentials,
    aws_secretsmanager_secret.blog_user2_credentials,
    aws_s3_bucket.blog_header_image_bucket,
    aws_cloudwatch_log_group.blog_service_log_group
  ]
}

resource "aws_ecs_service" "blog_service" {
  name             = "blog"
  cluster          = aws_ecs_cluster.blog_ecs_cluster.id
  task_definition  = aws_ecs_task_definition.blog_task_definition.arn
  desired_count    = 1
  launch_type      = "FARGATE"
  platform_version = "LATEST"
  force_new_deployment = true

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
    aws_secretsmanager_secret.blog_jwt_secret,
    aws_secretsmanager_secret.blog_docdb_uri,
    aws_secretsmanager_secret.blog_docdb_credentials,
    aws_secretsmanager_secret.blog_header_image_bucket_credentials,
    aws_security_group.blog_service_sg,
    aws_subnet.public_subnet_a,
    aws_subnet.public_subnet_b,
    aws_lb_target_group.blog_target_group,
    aws_docdb_cluster.blog_docdb_cluster,
    aws_docdb_cluster_instance.blog_docdb_instance
  ]
}
