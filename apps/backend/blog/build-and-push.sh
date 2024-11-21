aws ecr get-login-password --region ap-southeast-1 --profile boh | docker login --username AWS --password-stdin 839459181456.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t blog-repo -f Dockerfile ../../../.
docker tag blog-repo:latest 839459181456.dkr.ecr.ap-southeast-1.amazonaws.com/blog-repo:latest
docker push 839459181456.dkr.ecr.ap-southeast-1.amazonaws.com/blog-repo:latest
