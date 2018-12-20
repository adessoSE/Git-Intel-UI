FROM nginx:alpine

COPY nginx.conf nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/ .