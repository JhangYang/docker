# What's inside
##### For dev, prod
 - nginx: stable-alpine
 - php-fpm: {version=8.3}-alpine
 - mariadb: {version=latest}
 - phpmyadmin
 - redis: alpine
 - react: {version=current}-alpine
##### For tool
 - composer: from the same as `php-fpm`
 - npm: {version=current}-alpine
 - mailhog
##### For laravel
 - laravel horizon
 - laravel schedule
 - laravel echo server



# Environment
 - Ubuntu 22.04 LTS
 - Docker latest



# Installation
First, on your host, following below url to install docker service
https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

Second, clone this repository from github
```
> git clone git@github.com:JhangYang/docker.git {your_repo_name}
> cd {your_repo_name}
> cp .env.example .env
```

Final, run as
```
> docker compose up -d {container_name}
```

or you prefer to run as part of services, you can using `--profile` option, like
```
> docker compose --profile dev compose up -d
```



# Configure
### sites-available
In `./services/nginx/sites`, which are the files (There has three examples) you need to modify for nginx server, such as
```
> cd services/nginx/sites
> cp default.conf.example default.conf
```
Then changes the `listen` port or `server_name` or whatever you want in `default.conf`.

Of course, if you prefer, you can add any `.conf` on your own in this folder.

And remember to restart nginx service, the container will be restarting.
```
> docker compose up -d nginx
```

### .env
All of them in .env file can be change what you need.



# Usage
### `composer`

you can install laravel from composer
```
> docker compose run --rm composer create-project laravel/larvel:{version} {your_laravel_app}
```

If you want to run as `composer update` or `composer require` in `{your_laravel_app}`, you can modify `docker-compose.yml` file before you run `docker compose` command.
```
# Find the composer service block, then modify below

    composer:
        ...
-       working_dir: ${APP_CODE_PATH_CONTAINER}
+       working_dir: ${APP_CODE_PATH_CONTAINER}/{your_laravel_app}
        ...
```
Then, run as
```
> docker compose run --rm composer update
```

If you prefer, you also can enter the `php-fpm` container to use `composer` command.
```
> docker compose exec php-fpm /bin/sh

# The working folder is /var/www, change to your application folder.
> cd {your_laravel_app}
> composer ...

# Exit the container.
> exit
```

### `npm`

you can install react from npm
```
> docker compose run --rm npm create-react-app {your_react_app}
```

If you want to run `npm` command in {your_react_app}, you have to enter the `react` container.
```
> docker compose exec react /bin/sh

# The working folder is /var/www/{your_react_app}.
> npm ...

# Exit the container.
> exit
```