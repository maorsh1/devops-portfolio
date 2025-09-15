# Flask Monitoring with Prometheus & Grafana

This project demonstrates how to monitor a simple **Flask application** using **Prometheus** and **Grafana**.

## 📌 Project Overview
- **Flask app** exposes metrics on `/metrics` (port 5000).  
- **Prometheus** scrapes the metrics from the app (port 9090).  
- **Grafana** visualizes the metrics via custom dashboards (port 3000).  

## ⚙️ Setup
1. Clone the repository.  
2. Start the stack:  
   ```bash
   docker-compose up -d
Access the services:

Flask App → http://localhost:5000

Prometheus → http://localhost:9090

Grafana → http://localhost:3000

📊 Metrics
app_requests_total → total number of requests handled.

app_request_latency_seconds → request latency in seconds.

📷 Screenshots
You can find example screenshots of the running project inside the
images/ directory.
This includes:

Dashboard from Grafana

the app metricts

Running containers

