#!/bin/sh

until pg_isready -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME"; do
  echo "Waiting for Postgres..."
  sleep 2
done

echo "Postgres is ready, running migrations..."

npx prisma migrate deploy

echo "Migrations complete, starting server..."

node build/index.js
