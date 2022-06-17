# How to deploy

```cmd
    docker tag <image-id> registry.heroku.com/s-assesment-web/web
    docker push registry.heroku.com/s-assesment-web/web
    heroku login
    heroku container:login
    heroku container:release web -a s-assesment-web
```
