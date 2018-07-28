FROM node:8.11.3

WORKDIR /app

RUN apt-get update

RUN echo "Asia/Shanghai" > /etc/timezone;dpkg-reconfigure -f noninteractive tzdata

COPY package*.json ./

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 7001

CMD ["npm", "run", "docker"]