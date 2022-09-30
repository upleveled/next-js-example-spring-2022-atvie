#! /bin/sh

if [ -z ${FLY_APP_NAME+x} ]
then
  yarn start
  exit 0
fi

if [ ! -d "../postgres-volume" ]
then
  mkdir -p /run/postgresql/data/
  chown postgres:postgres /run/postgresql/data /run/postgresql/
  su postgres -c "initdb -D /run/postgresql/data"
  echo "listen_addresses='*'" >> /run/postgresql/data/postgresql.conf
  su postgres -c "pg_ctl start -D /run/postgresql/data"
  psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'"
  createdb -U postgres --owner=$PGUSERNAME $PGDATABASE
else
  mkdir -p /postgres-volume/run/postgresql/data/
  chown postgres:postgres /postgres-volume/run/postgresql/data /postgres-volume/run/postgresql/
  [ ! -f  /postgres-volume/run/postgresql/data/postgresql.conf ] && su postgres -c "initdb -D /postgres-volume/run/postgresql/data"
  sed -i 's/run\/postgresql/postgres-volume\/run\/postgresql/g'  /postgres-volume/run/postgresql/data/postgresql.conf
  grep -qxF "listen_addresses='*'"  /postgres-volume/run/postgresql/data/postgresql.conf || echo   "listen_addresses='*'" >>  /postgres-volume/run/postgresql/data/postgresql.conf
  [ ! -f  /postgres-volume/run/postgresql/data/postmaster.pid ] && su postgres -c "pg_ctl start -D /postgres-volume/run/postgresql/data" || su postgres -c "pg_ctl restart -D  /postgres-volume/run/postgresql/data"
  psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD'$PGPASSWORD'" ||    echo "User already exists"
  createdb -U postgres --owner=$PGUSERNAME $PGDATABASE || echo "Database already exists"
fi

yarn migrate up
yarn start
