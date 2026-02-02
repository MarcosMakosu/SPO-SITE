# Multi-stage Dockerfile for Hostinger VPS

# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend/ ./
# Set backend URL to relative for production (same domain)
ENV REACT_APP_BACKEND_URL=/api
RUN yarn build

# Stage 2: Backend & Final Image
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Backend Code
COPY backend/ ./backend
COPY scripts/ ./scripts

# Copy Frontend Build from Stage 1
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Setup Environment
ENV PYTHONPATH=/app
ENV PORT=8000
ENV SECRET_KEY=changeme_in_production

# Create uploads dir
RUN mkdir -p /app/backend/uploads

# Run startup script
CMD ["sh", "-c", "python scripts/seed_doctors.py && gunicorn -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000 backend.server:app"]
