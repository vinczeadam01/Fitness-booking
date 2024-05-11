FROM node:20.11.1
WORKDIR /usr/src/app

RUN npm install -g @angular/cli

CMD npm install && ng serve --host=0.0.0.0
