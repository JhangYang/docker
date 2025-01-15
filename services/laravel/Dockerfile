ARG PHP_VERSION

FROM php:${PHP_VERSION}-fpm

RUN set -eux; \
	apt-get update && apt-get install -y --no-install-recommends \
	ca-certificates \
	supervisor \
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
	curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg

RUN curl https://packages.microsoft.com/config/ubuntu/24.04/prod.list | tee /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 unixodbc-dev \
	&& echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.bashrc

RUN pecl install sqlsrv pdo_sqlsrv \
	&& docker-php-ext-enable sqlsrv pdo_sqlsrv

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

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

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]

WORKDIR /etc/supervisor/conf.d/