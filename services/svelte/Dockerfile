ARG NODE_VERSION
ARG FRONTEND_APP_NAME=frontend
ARG PGID
ARG PUID
ARG PUSER

FROM node:${NODE_VERSION}-alpine

RUN set -eux; \
	apk --update --no-cache add \
	openssl

RUN mkdir -p /var/www/${FRONTEND_APP_NAME}

WORKDIR /var/www/${FRONTEND_APP_NAME}

ENV PUID ${PUID}
ENV PGID ${PGID}
ENV PUSER ${PUSER}

RUN set -x; \
	addgroup -g ${PGID} -S ${PUSER} || true; \
	adduser -u ${PUID} -D -S -G ${PUSER} -s /bin/sh ${PUSER} || true

EXPOSE 5173

CMD ["sh"]