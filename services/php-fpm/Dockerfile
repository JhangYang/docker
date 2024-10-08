ARG PHP_VERSION

FROM php:${PHP_VERSION}-fpm

RUN set -eux; \
	apt-get update && apt-get install -y --no-install-recommends \
	ca-certificates \
	apt-transport-https \
	build-essential \
	libicu-dev \
	zlib1g-dev \
	libzip-dev \
	libxml2-dev \
	libjpeg-dev \
	libpng-dev \
	libwebp-dev \
	libfreetype6-dev \
	autoconf \
	gnupg2 \
	libssl-dev \
	libssh2-1-dev \
	unzip \
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
	&& rm -rf /var/lib/apt/lists/*

#SQL Server
RUN set -eux; \ 
	curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o

RUN curl https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/prod.list | tee /etc/apt/sources.list.d/mssql-release.list

RUN apt update && ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 unixodbc-dev \
	&& echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc \
	&& source ~/.bashrc \
	&& pecl install sqlsrv pdo_sqlsrv \
	&& docker-php-ext-enable sqlsrv pdo_sqlsrv

# curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
# && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list \
# && apt-get update \
# && ACCEPT_EULA=Y apt-get install -y \
# msodbcsql18 \
# mssql-tools18 \
# unixodbc-dev \
# && pecl install sqlsrv pdo_sqlsrv \
# && docker-php-ext-enable sqlsrv pdo_sqlsrv \
# && apt-get clean && rm -rf /var/lib/apt/lists/*

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