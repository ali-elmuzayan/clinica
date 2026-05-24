FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/

RUN npm run install:frontend --omit=dev

COPY backend/package*.json ./backend/
RUN npm run install:backend --omit=dev


COPY client/ ./client/
COPY backend/ ./backend/

RUN npm run build:frontend
USER node 


CMD ["npm", "start:backend"]
EXPOSE 3000