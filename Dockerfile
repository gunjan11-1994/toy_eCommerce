# ---------- Build stage ----------
FROM node:24-alpine AS build
WORKDIR /app

# Install dependencies first so this layer is cached until package files change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite mode: "production" (default) or "qa" -> picks .env.production / .env.qa
ARG MODE=production
RUN npx tsc -b && npx vite build --mode ${MODE}

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
