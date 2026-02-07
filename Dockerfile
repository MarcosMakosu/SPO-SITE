# ===============================
# Build Frontend
# ===============================
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend

COPY frontend/package.json ./
RUN npm install

COPY frontend/ ./
ENV REACT_APP_BACKEND_URL=/api
RUN npm run build

# ===============================
# Backend
# ===============================
FROM python:3.11-slim

WORKDIR /app

# Dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Dependências Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Código
COPY backend/ ./backend
COPY scripts/ ./scripts

# Frontend buildado
COPY --from=frontend-build /app/frontend/build ./frontend/build

ENV PYTHONPATH=/app
ENV SECRET_KEY=changeme_in_production

# Render usa essa porta
ENV PORT=10000

EXPOSE 10000

CMD ["sh", "-c", "python scripts/seed_doctors.py && gunicorn backend.server:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT"]
