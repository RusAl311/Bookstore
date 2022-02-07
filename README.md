# Bookstore project

## How to run project 
docker-compose -f "docker-compose.yml" up -d --build

## Containers 

* bookstorebe:
    * ASP .NET 6 Web Api application on port 5000
* bookstoredb:
    * PostgreSQL on port 5432 with   
        DB: "bookstore_db"  
        POSTGRES_USER: "bookstore_user"
        POSTGRES_PASSWORD: "BookSt0re9876" 
* pgadmin:
    * PGAdmin for manage postgres on port 5050 with 
        * PGADMIN_DEFAULT_EMAIL: "rustamm.aliyev@gmail.com"
        * PGADMIN_DEFAULT_PASSWORD: "BookSt0re9876"
* bookstoerui:
    * React application with nginx
        * Credentials for login: 
            * bookstore_user
            * BookSt0re9876
* containers network: 
    * bookstore-network


