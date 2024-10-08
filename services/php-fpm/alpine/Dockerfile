ARG PHP_VERSION

FROM php:${PHP_VERSION}-fpm-alpine

RUN set -eux; \
	apk --update --no-cache add \
	ca-certificates \
	build-base \
	icu-dev \
	zlib \
	libzip-dev \
	libxml2-dev \
	libjpeg-turbo-dev \
	libpng-dev \
	libwebp-dev \
	freetype-dev \
	autoconf \
	openssl-dev \
	libssh2-dev \
	&& docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
	&& docker-php-ext-configure intl \
	&& docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype \
	&& docker-php-ext-install gd \
	&& docker-php-ext-configure zip \
	&& docker-php-ext-install \
	pdo_mysql \
	bcmath \
	intl \
	opcache \
	zip \
	xml \
	# SSH2
	&& pecl install -a ssh2-1.3.1 \
	&& docker-php-ext-enable ssh2 \
	# Clean cache
	&& apk del --purge build-base autoconf \
	&& rm -rf /var/cache/apk/*

COPY ./opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY ./laravel.ini /usr/local/etc/php/conf.d
COPY ./xlaravel.pool.conf /usr/local/etc/php-fpm.d/
COPY ./www.conf /usr/local/etc/php-fpm.d/www.conf

# Configure non-root user.
ARG PUID=1000
ARG PGID=1000
ARG PUSER=www-data

ENV PUID ${PUID}
ENV PGID ${PGID}
ENV PUSER ${PUSER}

RUN set -x; \
	addgroup -g ${PGID} -S ${PUSER} || true; \
	adduser -u ${PUID} -D -S -G ${PUSER} -s /bin/sh ${PUSER} || true

RUN sed -i "s/user = www-data/user = '${PUSER}'/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = '${PUSER}'/g" /usr/local/etc/php-fpm.d/www.conf

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN mkdir -p /var/www

# set working directory
WORKDIR /var/www

EXPOSE 9000