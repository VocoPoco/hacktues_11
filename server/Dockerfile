FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    FLASK_APP=run.py \
    FLASK_ENV=production

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt && \
    pip cache purge

COPY . .

EXPOSE 5000
CMD ["ls", "-la"]
CMD ["python", "run.py"]