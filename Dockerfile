FROM python:3.11-slim

WORKDIR /app

# Copy SDK first
COPY lexiguard_sdk /app/lexiguard_sdk

# Copy fastapi app requirements
COPY fastapi_app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy fastapi app code
COPY fastapi_app/main.py .

# Expose port
ENV PORT=8080
EXPOSE 8080

# Run the application
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT} --workers 1