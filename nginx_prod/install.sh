docker run -d \
 -p 8075:80 \
 --name nginx-test  \
 -v  $PWD/conf:/etc/nginx/conf.d \
 -v  $PWD/html:/var/www \
 nginx
