FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
CMD [ "npm", "run", "toru"]

# npm rebuild bcrypt --build-from-source