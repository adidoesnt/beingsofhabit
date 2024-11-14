resource "aws_s3_bucket" "blog_header_image_bucket" {
  bucket = "blog-header-image-bucket"


  tags = {
    Name = "Beings of Habit Blog Header Image Bucket"
  }
}

### Static frontend hosting ###
variable "domain" {
  type    = string
  default = "admin.boh-services.com"
}

resource "aws_s3_bucket" "blog_portal_bucket" {
  bucket = "www.${var.domain}"

  tags = {
    Name = "Beings of Habit Blog Portal Deployment Bucket"
  }
}

resource "aws_s3_bucket_acl" "blog_portal_bucket_acl" {
  bucket = aws_s3_bucket.blog_portal_bucket.id
  acl    = "public-read"

  depends_on = [
    aws_s3_bucket.blog_portal_bucket,  
    aws_s3_bucket_public_access_block.blog_portal_bucket_public_access_block
  ]
}

resource "aws_s3_bucket_versioning" "blog_portal_bucket_versioning" {
  bucket = aws_s3_bucket.blog_portal_bucket.id

  versioning_configuration {
    status = "Enabled"
  }

  depends_on = [aws_s3_bucket.blog_portal_bucket]
}

resource "aws_s3_bucket_public_access_block" "blog_portal_bucket_public_access_block" {
  bucket = aws_s3_bucket.blog_portal_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  depends_on = [aws_s3_bucket.blog_portal_bucket]
}

resource "aws_s3_bucket_ownership_controls" "blog_portal_bucket_ownership_controls" {
  bucket = aws_s3_bucket.blog_portal_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }

  depends_on = [
    aws_s3_bucket.blog_portal_bucket,
    aws_s3_bucket_public_access_block.blog_portal_bucket_public_access_block
  ]
}

resource "aws_s3_bucket_policy" "blog-portal-bucket-policy" {
  bucket = aws_s3_bucket.blog_portal_bucket.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.blog_portal_bucket.bucket}/*",
        ]
      }
    ]
  })

  depends_on = [
    aws_s3_bucket.blog_portal_bucket,
    aws_s3_bucket_public_access_block.blog_portal_bucket_public_access_block
  ]
}

resource "aws_s3_bucket_website_configuration" "blog_portal_bucket_website_configuration" {
  bucket = aws_s3_bucket.blog_portal_bucket.id

  index_document {
    suffix = "index.html"
  }
}
