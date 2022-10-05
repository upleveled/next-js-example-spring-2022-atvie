#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -e

# Set volume path for use in PostgreSQL paths if volume directory exists
[ -d "../postgres-volume" ] && VOLUME_PATH=/postgres-volume

# Create ENV variable when database need to be initialized
[ ! -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ] && DATABASE_INIT="1"

# Create and add permissions to folders for PostgreSQL
mkdir -p $VOLUME_PATH/run/postgresql/data/
chown postgres:postgres $VOLUME_PATH/run/postgresql/ $VOLUME_PATH/run/postgresql/data/

# Initialize a database in the data directory
[ $DATABASE_INIT == "1" ] && su postgres -c "initdb -D $VOLUME_PATH/run/postgresql/data/"

# Configure PostgreSQL to read configuration file from the volume location when a Postgres volume exist
sed -i "s/'\/run\/postgresql\'/'\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/postgresql.conf || echo "Postgres volume not mounted"

# Configure PostgreSQL to listen requests by adding a configuration string only once
grep -qxF "listen_addresses='*'"  $VOLUME_PATH/run/postgresql/data/postgresql.conf || echo "listen_addresses='*'" >>  $VOLUME_PATH/run/postgresql/datapostgresql.conf

# Either:
# 1. Restart database after app with a volume is redeployed
# 2. Start database after database is created
su postgres -c "pg_ctl restart -D /postgres-volume/run/postgresql/data/" || su postgres -c "pg_ctl start -D $VOLUME_PATH/run/postgresql/data/"

# Use the credentials from Fly.io secrets to create user and database when needed
[ $DATABASE_INIT == "1" ] && psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'"
[ $DATABASE_INIT == "1" ] && createdb -U postgres --owner=$PGUSERNAME $PGDATABASE

# Run migrations and start the production server directly from node to avoid having package.json in production
node /app/node_modules/ley/bin.js up
node /app/node_modules/next/dist/bin/next start
