FROM nginx:latest

MAINTAINER stone (1453793807@qq.com)

COPY dist/ /usr/share/nginx/html/

RUN echo 'rio/web init SUCCESS'