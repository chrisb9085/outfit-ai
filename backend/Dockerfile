FROM python:3.9

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application files
COPY . .

# Hugging Face Spaces uses port 7860
EXPOSE 7860

# Run the Flask app with gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:7860"]