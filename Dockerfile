FROM node:20-alpine

# Cài đặt các phụ thuộc cần thiết
RUN apk add --no-cache python3 make g++ postgresql-client

WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ source code
COPY . .

# Tạo Prisma client
RUN npx prisma generate

# Build ứng dụng
RUN npm run build

# Expose port
EXPOSE 3005

# Khởi chạy ứng dụng
CMD ["node", "dist/src/main.js"]