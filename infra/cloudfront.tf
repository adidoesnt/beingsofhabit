variable "admin_portal_certificate_arn" {
  type = string
  default = "arn:aws:acm:us-east-1:839459181456:certificate/2aced4de-0e15-4781-8e3f-8dbd111d496b"
}

variable "admin_portal_alias" {
    type = string
    default = "admin.boh-services.com"
}

resource "aws_cloudfront_distribution" "admin_portal_distribution" {
    origin {
        custom_origin_config {
            origin_protocol_policy = "http-only"
            http_port = 80
            https_port = 443
            origin_ssl_protocols = ["TLSv1.2", "TLSv1.1", "TLSv1"]
        }
        domain_name = "${aws_s3_bucket.admin_portal_bucket.bucket}.s3-website-ap-southeast-1.amazonaws.com"
        origin_id   = "S3-${aws_s3_bucket.admin_portal_bucket.bucket}"
    }

    aliases = [ var.admin_portal_alias ]

    viewer_certificate {
        acm_certificate_arn = var.admin_portal_certificate_arn
        ssl_support_method = "sni-only"
    }

    enabled             = true
    is_ipv6_enabled     = true

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "S3-${aws_s3_bucket.admin_portal_bucket.bucket}"
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

    depends_on = [ aws_s3_bucket.admin_portal_bucket ]
}