FROM node:current-alpine AS buildWeb
WORKDIR /usr/angularapp
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=buildWeb /usr/angularapp/dist/dashboard-qube /usr/share/nginx/html
EXPOSE 4200