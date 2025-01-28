FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

FROM nginx:latest

COPY --from=build /usr/local/app/dist/projet_angular/browser /usr/share/nginx/html

EXPOSE 80
