FROM python:3.11-slim

WORKDIR /app
COPY updater.py .

RUN apt-get update && apt-get install -y cron && \
    echo "0 */6 * * * root python /app/updater.py >> /var/log/cron.log 2>&1" > /etc/cron.d/updater-cron && \
    chmod 0644 /etc/cron.d/updater-cron && \
    crontab /etc/cron.d/updater-cron

CMD ["cron", "-f"]