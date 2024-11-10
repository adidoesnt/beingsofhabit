resource "aws_iam_user" "s3_user" {
  name = "s3-user"

  tags = {
    Name = "Beings of Habit S3 User"
  }
}

resource "aws_iam_policy" "s3_user_policy" {
  name        = "S3AccessPolicy"
  description = "Policy for S3 bucket access for the backend"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject"
        ],
        Effect = "Allow",
        Resource = [
          aws_s3_bucket.blog_header_image_bucket.arn,
          "${aws_s3_bucket.blog_header_image_bucket.arn}/*"
        ]
      }
    ]
  })

  tags = {
    Name = "Beings of Habit S3 User Policy"
  }

  depends_on = [aws_s3_bucket.blog_header_image_bucket]
}

resource "aws_iam_user_policy_attachment" "s3_user_attachment" {
  user       = aws_iam_user.s3_user.name
  policy_arn = aws_iam_policy.s3_user_policy.arn

  depends_on = [aws_iam_policy.s3_user_policy, aws_iam_user.s3_user]
}

resource "aws_iam_access_key" "s3_user_access_key" {
  user = aws_iam_user.s3_user.name

  depends_on = [aws_iam_user.s3_user]
}

# TODO: update ecs task execution role to allow secret manager access
