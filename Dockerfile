FROM NODE:20.12.0
WORKDIR /app
COPY . . 

RUN npm install
RUN npm run build

EXPOSE 3000
CMD npm start