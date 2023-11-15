# Derivando da imagem oficial do MySQL
FROM mysql:5.7
# Adicionando os scripts SQL para serem executados na criação do banco
# COPY ./index.sql /docker-entrypoint-initdb.d/
COPY ./index.sql /docker-entrypoint-initdb.d/
# COPY ./products.sql /docker-entrypoint-initdb.d/
# COPY ./queries_users.sql /docker-entrypoint-initdb.d/
# COPY ./queries_products.sql /docker-entrypoint-initdb.d/

EXPOSE 3306


# image: btree-mysql-image
# container: btree-mysql-container
# docker build -t btree-mysql-image .
# docker run -p 3306:3306 --name btree-mysql-container -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=test -d btree-mysql-image

# container: btree-redis-container
# docker run --name btree-redis-container -p 6379:6379 -d redis/redis-stack-server:latest
# docker run -p 6379:6379 -it redis/redis-stack-server:latest
