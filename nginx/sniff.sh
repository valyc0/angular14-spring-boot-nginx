docker run --name proxy-container -d -p 8081:8090 \
    -e URL=http://172.17.0.1:8080    \
    0000bartek/nginx-ngrep


docker exec -it proxy-container bash

ngrep -q -W byline port 8090
