resource "aws_s3_bucket" "blog_header_image_bucket" {
  bucket        = "blog-header-image-bucket"
  force_destroy = true

  tags = {
    Name = "Beings of Habit Blog Header Image Bucket"
  }
}

resource "aws_s3_bucket_cors_configuration" "blog_header_image_bucket_cors_configuration" {
  bucket = aws_s3_bucket.blog_header_image_bucket.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT"]
    allowed_origins = [var.admin_portal_url]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  depends_on = [aws_s3_bucket.blog_header_image_bucket]
}

### Static frontend hosting ###
resource "aws_s3_bucket" "admin_portal_bucket" {
  bucket        = "admin-portal-deployment-bucket"
  force_destroy = true

  tags = {
    Name = "Beings of Habit Blog Portal Deployment Bucket"
  }
}

resource "aws_s3_bucket_ownership_controls" "admin_portal_bucket_ownership_controls" {
  bucket = aws_s3_bucket.admin_portal_bucket.id

  rule {
    object_ownership = "ObjectWriter"
  }

  depends_on = [
    aws_s3_bucket.admin_portal_bucket,
  ]
}

resource "aws_s3_bucket_acl" "admin_portal_bucket_acl" {
  bucket = aws_s3_bucket.admin_portal_bucket.id
  acl    = "public-read"

  depends_on = [
    aws_s3_bucket.admin_portal_bucket,
    aws_s3_bucket_public_access_block.admin_portal_bucket_public_access_block,
    aws_s3_bucket_ownership_controls.admin_portal_bucket_ownership_controls
  ]
}

resource "aws_s3_bucket_versioning" "admin_portal_bucket_versioning" {
  bucket = aws_s3_bucket.admin_portal_bucket.id

  versioning_configuration {
    status = "Enabled"
  }

  depends_on = [aws_s3_bucket.admin_portal_bucket]
}

resource "aws_s3_bucket_public_access_block" "admin_portal_bucket_public_access_block" {
  bucket = aws_s3_bucket.admin_portal_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  depends_on = [
    aws_s3_bucket.admin_portal_bucket,
    aws_s3_bucket_ownership_controls.admin_portal_bucket_ownership_controls
  ]
}

resource "aws_s3_bucket_policy" "admin-portal-bucket-policy" {
  bucket = aws_s3_bucket.admin_portal_bucket.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.admin_portal_bucket.bucket}",
          "arn:aws:s3:::${aws_s3_bucket.admin_portal_bucket.bucket}/*",
        ]
      }
    ]
  })

  depends_on = [
    aws_s3_bucket.admin_portal_bucket,
    aws_s3_bucket_public_access_block.admin_portal_bucket_public_access_block,
    aws_s3_bucket_ownership_controls.admin_portal_bucket_ownership_controls
  ]
}

resource "aws_s3_bucket_website_configuration" "admin_portal_bucket_website_configuration" {
  bucket = aws_s3_bucket.admin_portal_bucket.id

  index_document {
    suffix = "index.html"
  }

  depends_on = [
    aws_s3_bucket.admin_portal_bucket,
    aws_s3_bucket_ownership_controls.admin_portal_bucket_ownership_controls
  ]
}
