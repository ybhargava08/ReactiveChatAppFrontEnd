## FIRST STEP install npm and build distributable ##

FROM node:9.8.0-alpine as node
COPY package.json /ChatApp/
WORKDIR /ChatApp/
#RUN chmod -R 777 .
RUN npm i && npm i --save redux && npm i --save @angular-redux/store
COPY ./ /ChatApp/
RUN $(npm bin)/ng build --prod


## SECOND STEP COPY dist contents in nginx root ## 

FROM nginx:1.13.9-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /ChatApp/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]