FROM mcr.microsoft.com/dotnet/core/sdk:3.1
LABEL version="1.0"

WORKDIR /app
COPY ./backend/pe-na-estrada-api .
RUN dotnet publish -o ./dist

FROM mcr.microsoft.com/dotnet/core/runtime:3.1

WORKDIR /app

COPY --from=0 /app/dist/ .

ENV DOTNET_VERSION 3.1.0

ENTRYPOINT [ "/usr/share/dotnet/dotnet","xxxxx.dll" ]
