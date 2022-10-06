#!/usr/bin/env bash

# Exit if any command exits with a non-zero exit code
set -e

# Set volume path for use in PostgreSQL paths if volume directory exists
[ -d "../postgres-volume" ] && VOLUME_PATH=/postgres-volume

# Create and add permissions to folders for PostgreSQL
mkdir -p $VOLUME_PATH/run/postgresql/data/
chown postgres:postgres $VOLUME_PATH/run/postgresql/ $VOLUME_PATH/run/postgresql/data/

# Initialize database only when database config file doesn't exist yet, this happens during:
# 1. Deployment / redeployment of an app without a volume
# 2. First deployment of an app with a volume
if [[ -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ]]; then
  # Restart database after app with a volume is redeployed
  su postgres -c "pg_ctl restart -D /postgres-volume/run/postgresql/data/"
else
  # Initialize a database in the data directory
  su postgres -c "initdb -D $VOLUME_PATH/run/postgresql/data/"

  # Update PostgreSQL config path to use volume location if app has a volume
  sed -i "s/'\/run\/postgresql'/'\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/  postgresql.conf || echo "PostgreSQL volume not mounted, running database as non-persistent (new deploys erase   changes not saved in migrations)"

  # Configure PostgreSQL to listen requests by adding a configuration string only once
  echo "listen_addresses='*'" >> $VOLUME_PATH/run/postgresql/datapostgresql.conf

  # Start database after database is created
  su postgres -c "pg_ctl start -D $VOLUME_PATH/run/postgresql/data/"

  # Create user and database with credentials from Fly.io secrets
  psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'"
  createdb -U postgres --owner=$PGUSERNAME $PGDATABASE
fi

yarn migrate up
yarn start
