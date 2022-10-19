# syntax=docker/dockerfile:1
FROM alpine
RUN \
  apk update && \
  apk add nginx
COPY ./nginx /
COPY ./build /var/lib/nginx/html/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
