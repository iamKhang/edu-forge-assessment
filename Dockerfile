# Sử dụng Node.js làm image cơ bản
FROM node:22

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng NestJS
RUN npm run build

# Khai báo cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh khởi động ứng dụng
CMD ["npm", "run", "start:prod"]