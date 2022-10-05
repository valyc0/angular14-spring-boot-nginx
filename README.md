# angular14-spring-boot-nginx

to start web in fake response mode:


run 
```sh
yarn install
```
then  
```sh
yarn start
```

run   
```sh
yarn build
``` 
to build for prod  

change file app.module.ts comment line:  
providers: [httpInterceptorProviders,fakeBackendProvider],  
and uncomment:  
providers: [httpInterceptorProviders,fakeBackendProvider],  

to start server java spring boot:
```sh
cd spring-boot-security-login/
mvn spring-boot:run
``` 

to start nginx
```sh
cd nginx
./install.sh
``` 
