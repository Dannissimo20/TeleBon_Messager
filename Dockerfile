FROM node:18-alpine as build
WORKDIR /app
COPY package*.json /app/

RUN yarn add terser
RUN yarn install
COPY ./ /app/
RUN yarn run build



FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


