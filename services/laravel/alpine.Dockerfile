ARG PHP_VERSION

FROM php:${PHP_VERSION}-alpine

RUN apk --update add wget \
    curl \
    git \
    build-base \
    libmcrypt-dev \
    libxml2-dev \
    pcre-dev \
    zlib-dev \
    autoconf \
    cyrus-sasl-dev \
    libgsasl-dev \
    oniguruma-dev \
    supervisor \
    procps; \
    apk --update add openssl-dev;


RUN pecl channel-update pecl.php.net;

RUN docker-php-ext-install mysqli mbstring pdo pdo_mysql xml pcntl bcmath;

# Add a non-root user to help install ffmpeg:
ARG PUID=1000
ARG PGID=1000
ARG PUSER=www-data

RUN set -x; \
    addgroup -g ${PGID} -S ${PUSER} || true; \
    adduser -u ${PUID} -D -S -G ${PUSER} -s /bin/sh ${PUSER} || true

RUN rm /var/cache/apk/* \
    && mkdir -p /var/www

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]

WORKDIR /etc/supervisor/conf.d/