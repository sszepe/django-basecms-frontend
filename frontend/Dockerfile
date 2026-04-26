FROM node:22-alpine AS builder
ARG VITE_API_ORIGIN=http://localhost:8081
ARG VITE_AVAILABLE_LANGUAGES=en,de
ARG VITE_DEFAULT_LANGUAGE=en
ENV VITE_AVAILABLE_LANGUAGES=$VITE_AVAILABLE_LANGUAGES
ENV VITE_DEFAULT_LANGUAGE=$VITE_DEFAULT_LANGUAGE
ARG VITE_SITE_TITLE=Site
ENV VITE_API_ORIGIN=$VITE_API_ORIGIN
ENV VITE_SITE_TITLE=$VITE_SITE_TITLE
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
