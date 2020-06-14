FROM mcr.microsoft.com/dotnet/core/sdk:3.1
LABEL version="1.0"

WORKDIR /app
COPY ./backend/pe-na-estrada-api .
RUN dotnet publish -o ./dist

#FROM mcr.microsoft.com/dotnet/core/runtime:3.1
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=0 /app/dist/ .
COPY ./devops/run.sh .

ENV DOTNET_VERSION 3.1.0

ENTRYPOINT ["bash", "run.sh" ]
