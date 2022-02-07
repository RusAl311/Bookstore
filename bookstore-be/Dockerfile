FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base
# FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://*:5000

# For Swagger 
ENV ASPNETCORE_ENVIRONMENT=Development 

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /src
COPY ["/bookstore-be/bookstore-be.csproj", "/bookstore-be/"]
RUN dotnet restore "/bookstore-be/bookstore-be.csproj"
COPY . .
WORKDIR "/src/bookstore-be/"
RUN dotnet build "bookstore-be.csproj" -c Release -o /app/build

# RUN dotnet tool install --global dotnet-ef
# ENV PATH="${PATH}:/root/.dotnet/tools"
# RUN dotnet ef database update

FROM build AS publish
RUN dotnet publish "bookstore-be.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "bookstore-be.dll"]
