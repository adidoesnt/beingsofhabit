resource "aws_s3_bucket" "blog_header_image_bucket" {
  bucket = "blog-header-image-bucket"
  

  tags = {
    Name = "Beings of Habit Blog Header Image Bucket"
  }
}