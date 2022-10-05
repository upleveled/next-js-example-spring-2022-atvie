#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -e

# Set volume path for use in PostgreSQL paths if volume directory exists
[ -d "../postgres-volume" ] && VOLUME_PATH=/postgres-volume

# Set flag to initialize database when database config file doesn't exist yet, this happens during:
# 1. Deployment / redeployment of an app without a volume
# 2. First deployment of an app with a volume
[ ! -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ] && SHOULD_INIT_DATABASE=true

# Create and add permissions to folders for PostgreSQL
mkdir -p $VOLUME_PATH/run/postgresql/data/
chown postgres:postgres $VOLUME_PATH/run/postgresql/ $VOLUME_PATH/run/postgresql/data/

# Initialize a database in the data directory
[ $SHOULD_INIT_DATABASE == true ] && su postgres -c "initdb -D $VOLUME_PATH/run/postgresql/data/"

# Configure PostgreSQL to read configuration file from the volume location when a PostgreSQL volume exist
sed -i "s/'\/run\/postgresql'/'\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/postgresql.conf || echo "PostgreSQL volume not mounted, non-persistent database (new deploys erase changes not saved in migrations)"

# Configure PostgreSQL to listen requests by adding a configuration string only once
grep -qxF "listen_addresses='*'"  $VOLUME_PATH/run/postgresql/data/postgresql.conf || echo "listen_addresses='*'" >>  $VOLUME_PATH/run/postgresql/datapostgresql.conf

# Either:
# 1. Restart database after app with a volume is redeployed
# 2. Start database after database is created
su postgres -c "pg_ctl restart -D /postgres-volume/run/postgresql/data/" || su postgres -c "pg_ctl start -D $VOLUME_PATH/run/postgresql/data/"

# Use the credentials from Fly.io secrets to create user and database when needed
[ $SHOULD_INIT_DATABASE == true ] && psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'"
[ $SHOULD_INIT_DATABASE == true ] && createdb -U postgres --owner=$PGUSERNAME $PGDATABASE

yarn migrate up
yarn start
