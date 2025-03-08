#!/bin/sh

# Run migrations
npx prisma migrate deploy
npx prisma db seed

exec "$@"