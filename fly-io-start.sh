#! /bin/sh

# Add Postgres volume path when it exist
[ -d "../postgres-volume" ] && VOLUME_PATH=/postgres-volume

# Create ENV variable when database need to be initialized
[ ! -f $VOLUME_PATH/run/postgresql/data/postgresql.conf ] && DATABASE_INIT=1

# Create and add permissions to folders for PostgreSQL
mkdir -p $VOLUME_PATH/run/postgresql/data/
chown postgres:postgres $VOLUME_PATH/run/postgresql/ $VOLUME_PATH/run/postgresql/data/

# Initialize database when needed
[ $DATABASE_INIT == 1 ] && su postgres -c "initdb -D $VOLUME_PATH/run/postgresql/data/"
sed -i "s/'\/run\/postgresql\'/'\/postgres-volume\/run\/postgresql'/g" /postgres-volume/run/postgresql/data/postgresql.conf || echo "Postgres volume not mounted"
grep -qxF "listen_addresses='*'"  $VOLUME_PATH/run/postgresql/data/postgresql.conf || echo "listen_addresses='*'" >>  $VOLUME_PATH/run/postgresql/datapostgresql.conf

# Start the database server
su postgres -c "pg_ctl restart -D /postgres-volume/run/postgresql/data/" || su postgres -c "pg_ctl start -D $VOLUME_PATH/run/postgresql/data/"

# Use the credentials from Fly.io secrets to create user and database when needed
[ $DATABASE_INIT == 1 ] && psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'"
[ $DATABASE_INIT == 1 ] && createdb -U postgres --owner=$PGUSERNAME $PGDATABASE

# Run migrations and start the production server
node /app/node_modules/ley/bin.js up
node /app/node_modules/next/dist/bin/next start
