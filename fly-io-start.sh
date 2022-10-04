#! /bin/sh

# Only initialize database on Fly.io environtment
if [ -z ${FLY_APP_NAME+x} ]
  then
    yarn start
    exit 0
fi

# Add postgres volume path when it exist
[ -d "../postgres-volume" ] && VOLUME_PATH=/postgres-volume

# Create and add permissions to directories that allocate the database
mkdir -p $VOLUME_PATH/run/postgresql/data/
chown postgres:postgres $VOLUME_PATH/run/postgresql/data/ $VOLUME_PATH/run/postgresql/

# Initialize and configure the database
[ ! -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ] && su postgres -c "initdb -D $VOLUME_PATH/run/postgresql/data/"
sed -i "s/'\/run\/postgresql\'/'\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/postgresql.conf || echo "postgres volume not mounted"
grep -qxF "listen_addresses='*'"  $VOLUME_PATH/run/postgresql/data/postgresql.conf || echo "listen_addresses='*'" >>  $VOLUME_PATH/run/postgresql/datapostgresql.conf

# Start the database server
su postgres -c "pg_ctl restart -D /postgres-volume/run/postgresql/data/" || su postgres -c "pg_ctl start -D $VOLUME_PATH/run/postgresql/data/"

# Use the credentials from secrets to create user and database when needed
psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'" || echo "User already exists"
createdb -U postgres --owner=$PGUSERNAME $PGDATABASE || echo "Database already exists"

# Run migrations and start the production server
node /app/node_modules/ley/bin.js up
node /app/node_modules/next/dist/bin/next start
