# Etapa de build
FROM node:22 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
FROM node:22-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
