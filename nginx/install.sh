docker run -d \
--net host \
 -p 8065:80 \
 --name nginx-test  \
 -v  $PWD/conf:/etc/nginx/conf.d \
 nginx
