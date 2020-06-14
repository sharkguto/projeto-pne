#!/bin/sh

set -e


export CONNECTION_STRING="Host=$POSTGRES_HOST;Database=$POSTGRES_DB;Username=$POSTGRES_USER;Password=$POSTGRES_PASSWORD"

export ASPNETCORE_URLS=http://*:8080

echo $CONNECTION_STRING

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -c '\q'; do
    echo >&2 "Postgres is unavailable - sleeping"
    sleep 1
done

echo >&2 "Postgres is up - executing command"

ls -la

/usr/share/dotnet/dotnet pe-na-estrada-api.dll 
