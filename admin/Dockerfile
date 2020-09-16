FROM nginx

COPY ./dist/ /usr/share/nginx/html/
RUN rm -rf /etc/nginx/conf.d/*
COPY ./web.conf /etc/nginx/conf.d/
