FROM node:18.8 as build
ARG DEBIAN_FRONTEND=noninteractive
USER root
COPY . /home/node/front
WORKDIR /home/node/front
RUN yarn
RUN yarn dist

FROM nginx:alpine
COPY --from=build /home/node/front/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
