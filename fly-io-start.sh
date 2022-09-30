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
  echo "host all all 0.0.0.0/0 trust" >> /run/postgresql/data/pg_hba.conf
  echo "listen_addresses='*'" >> /run/postgresql/data/postgresql.conf
  su postgres -c "pg_ctl start -D /run/postgresql/data"
  psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD '$PGPASSWORD'"
  createdb -U postgres --owner=$PGUSERNAME $PGDATABASE
  exit 0
fi

mkdir /postgres-volume/data /postgres-volume/run
chown postgres:postgres /postgres-volume/data /postgres-volume/run
[ ! -f /postgres-volume/data/postgresql.conf ] && su postgres -c "initdb -D /postgres-volume/data"
sed -i 's/run\/postgresql/postgres-volume\/run/g' /postgres-volume/data/postgresql.conf
grep -qxF "listen_addresses='*'" /postgres-volume/data/postgresql.conf || echo "listen_addresses='*'" >> /postgres-volume/data/postgresql.conf
[ ! -f /postgres-volume/data/postmaster.pid ] && su postgres -c "pg_ctl start -D /postgres-volume/data" || su postgres -c "pg_ctl restart -D /postgres-volume/data"
psql -U postgres postgres --command="CREATE USER $PGUSERNAME PASSWORD'$PGPASSWORD'" ||  echo "User already exists"
createdb -U postgres --owner=$PGUSERNAME $PGDATABASE || echo "Database already exists"
yarn migrate up
yarn start
