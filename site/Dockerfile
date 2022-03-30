FROM node
WORKDIR /app
ENV NDODE_ENV=development
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm", "run","dev"]