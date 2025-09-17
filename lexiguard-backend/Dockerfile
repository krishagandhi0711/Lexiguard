# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code
COPY . .

# Command to run the application when the container starts
# We expose port 8080 because that's what Cloud Run expects
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]