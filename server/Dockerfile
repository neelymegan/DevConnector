FROM node:12

# Create app directory
WORKDIR /usr/src/app/server

# add `/usr/src/app/client/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/server/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app/server/package.json
COPY package-lock.json /usr/src/app/server/package-lock.json

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "nodemon", "server.js" ]