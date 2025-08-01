FROM node:20-bullseye

RUN swapon --show

# Show versions
RUN node -v
RUN yarn -v

RUN apt-get update

# Install app dependencies
COPY package.json package.json
COPY yarn-lock.json yarn-lock.json
RUN yarn install

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
