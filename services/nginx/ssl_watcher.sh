#!/bin/bash

# Listner SSL certificate directory and reload Nginx
DIRECTORY=""
CERT_DIR="/etc/nginx/ssl/${DIRECTORY}"
echo "Starting certificate watcher for directory: $CERT_DIR"

inotifywait -m -e close_write,move,create,delete --include '\.pem$' "$CERT_DIR" | while read -r directory events filename; do
    echo "Detected change in $CERT_DIR. Event: $events, File: $filename"
    echo "Reloading Nginx..."
    nginx -s reload
done