# angular14-spring-boot-nginx

to start web in fake response mode:


run 
```sh
yarn install
```
to install
run  
```sh
yarn start
```
to start in develop
run 
```sh
yarn build
``` 
to build for prod

change file app.module.ts comment line:
providers: [httpInterceptorProviders,fakeBackendProvider],
and uncomment:
providers: [httpInterceptorProviders,fakeBackendProvider],
