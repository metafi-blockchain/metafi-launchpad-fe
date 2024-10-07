
docker stack rm pscpad-front-end
docker build -t pscpad-front-end:1.1.3 -f Dockerfile .

#docker push roster90/pscpad-front-end:1.0.5

docker stack deploy --compose-file deployment.yml pscpad-front-end