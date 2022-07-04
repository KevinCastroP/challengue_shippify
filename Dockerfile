FROM node:14.19.3-alpine
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN source .envrc
CMD [ "node", "index.js" ]
EXPOSE 5000
