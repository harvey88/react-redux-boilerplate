FROM node:carbon

COPY src /b/src
COPY config /b/config
COPY webpack* /b/
COPY package.json /b/
COPY server.js /b
COPY styles /b/styles
COPY .babelrc /b
COPY index.html /b
COPY .eslintrc /b

WORKDIR /b
RUN yarn install

RUN yarn build_stage

CMD ["yarn", "server"]
