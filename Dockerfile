FROM node
WORKDIR /opt/yobota
COPY ./node_modules ./node_modules
COPY ./dist ./dist
COPY ./.env ./.env
EXPOSE 8080
CMD [ "node", "./dist/server.js" ]