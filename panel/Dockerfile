FROM node
WORKDIR /app
ENV NDODE_ENV=development
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run","dev"]