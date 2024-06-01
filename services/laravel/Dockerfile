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


RUN pecl channel-update pecl.php.net; \
    docker-php-ext-install mysqli mbstring pdo pdo_mysql xml pcntl; \
    docker-php-ext-install tokenizer; \
    docker-php-ext-install bcmath; \
    docker-php-ext-install sockets; \
    docker-php-ext-configure zip --with-libzip;

# Install PhpRedis package:
ARG INSTALL_PHPREDIS=false
RUN if [ ${INSTALL_PHPREDIS} = true ]; then \
    # Install Php Redis Extension
    printf "\n" | pecl install -o -f redis; \
    rm -rf /tmp/pear; \
    docker-php-ext-enable redis; \
    fi

# Add a non-root user to help install ffmpeg:
ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

ARG PUSER=www-data
RUN addgroup -g ${PGID} ${PUSER} && \
    adduser -D -G ${PUSER} -u ${PUID} ${PUSER}

RUN rm /var/cache/apk/* \
    && mkdir -p /var/www

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]

WORKDIR /etc/supervisor/conf.d/