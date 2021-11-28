FROM node:16

ENV REACT_APP_BACKEND_URL="http://localhost:3000/"

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN CI=true npm test

CMD ["npm", "start"]