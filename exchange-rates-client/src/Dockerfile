# שלב הבנייה
FROM node:20 AS build
WORKDIR /app

# התקן את התלויות ובנה את הפרויקט
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# שלב הריצה
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# פתח את הפורט שבו ה-Frontend יאזין
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
