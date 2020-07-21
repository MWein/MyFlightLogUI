FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package.json ./

# Install packages
RUN npm install

# Bundle app source
COPY . .

# Build the distros
RUN npm run build


FROM nginx:alpine


# Uncomment error page
RUN sed -i -e 's/#error_page/error_page/g' /etc/nginx/conf.d/default.conf

# Change error page to index.html
RUN sed -i -e 's/404.html/index.html/g' /etc/nginx/conf.d/default.conf


WORKDIR /usr/share/nginx/html

COPY --from=0 /usr/src/app/dist/* .