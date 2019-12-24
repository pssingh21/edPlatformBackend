FROM node:latest 
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node ./bin/www
EXPOSE 8882