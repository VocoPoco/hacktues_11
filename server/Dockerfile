FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    FLASK_APP=run.py \
    FLASK_ENV=production \
    OLLAMA_HOST=http://host.docker.internal:11434

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt && \
    pip cache purge
RUN apt-get update && apt-get install -y curl

COPY . .

EXPOSE 5000
CMD ["ls", "-la"]
CMD ["python", "run.py"]