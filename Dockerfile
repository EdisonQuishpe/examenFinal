FROM nginx:latest
COPY config/default.conf /etc/nginx/conf.d/default.conf
#COPY . /usr/share/nginx/html