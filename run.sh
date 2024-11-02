docker build -t metafi/launchpad-fontend . 


docker buildx build --platform linux/amd64,linux/arm64 -t metafi/launchpad-fontend:0.1.0 --push .


docker push metafi/launchpad-fontend:0.1.0