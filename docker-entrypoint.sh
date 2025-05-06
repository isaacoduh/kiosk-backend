#!/bin/sh
set -e

# wait for postgres
echo " Waiting for POSTGRES at $DB_HOST:$DB_PORT... "
while ! nc -z "$DB_HOST" "$DB_PORT"; do
    sleep 1
done

# run prisma migrations
echo "Running database migrations..."
npx prisma migrate deploy

# launch app
echo "starting app"
exec "$@"