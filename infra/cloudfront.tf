variable "blog_portal_certificate_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:839459181456:certificate/2aced4de-0e15-4781-8e3f-8dbd111d496b"
}

variable "blog_portal_alias" {
    type = string
    default = "admin.boh-services.com"
}

resource "aws_cloudfront_distribution" "blog_portal_distribution" {
    origin {
        domain_name = aws_s3_bucket.blog_portal_bucket.bucket_regional_domain_name
        origin_id   = "S3-${aws_s3_bucket.blog_portal_bucket.bucket}"
    }

    aliases = [ var.blog_portal_alias ]

    viewer_certificate {
        acm_certificate_arn = var.blog_portal_certificate_arn
        ssl_support_method = "sni-only"
    }

    enabled             = true
    is_ipv6_enabled     = true

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "S3-${aws_s3_bucket.blog_portal_bucket.bucket}"
        viewer_protocol_policy = "redirect-to-https"
        compress = true

        forwarded_values {
            query_string = false
            headers = ["Origin"]
            cookies {
                forward = "none"
            }
        }
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    depends_on = [ aws_s3_bucket.blog_portal_bucket ]
}