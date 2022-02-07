FROM node:alpine as ui_build 
WORKDIR /app

#copy the react app to the container
COPY ./bookstore-ui/ /app/ 

#prepare the contiainer for building react 
RUN yarn install
RUN yarn build

#prepare nginx
FROM nginx:alpine

COPY --from=ui_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./bookstore-nginx/nginx.conf /etc/nginx/conf.d

#fire up nginx
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]
