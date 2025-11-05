FROM nginx:1.28

ENV TZ="Asia/Taipei"
EXPOSE 80/tcp

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./50x.html /usr/share/nginx/html/50x.html

CMD ["nginx", "-g", "daemon off;"]