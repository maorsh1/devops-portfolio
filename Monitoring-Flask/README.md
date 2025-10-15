# 🧠 Flask Application Monitoring with Prometheus & Grafana

This project demonstrates a complete **monitoring solution** for a Python **Flask web application** using **Prometheus** for metrics collection and **Grafana** for visualization.  
It highlights essential DevOps practices, including container orchestration, observability, and performance analysis — all running locally via Docker Compose.

---

## 🚀 Project Overview

The goal of this project was to create a **fully containerized monitoring environment** that tracks a running Flask app in real time.  
It consists of three main components:

- **Flask App** – a simple Python web server that exposes both application functionality and metrics (such as total requests and latency).  
- **Prometheus** – collects and stores the metrics exported by the Flask app and system exporters.  
- **Grafana** – connects to Prometheus as a data source and visualizes the metrics on custom-built dashboards.  

By combining these tools, the project simulates a real-world observability pipeline similar to what’s used in production-grade environments.

---

## ⚙️ Technologies Used
- **Python (Flask)** – Web framework exposing custom Prometheus metrics  
- **Prometheus** – Metrics scraping and time-series storage  
- **Grafana** – Visualization and dashboard creation  
- **Docker & Docker Compose** – Containerized deployment and orchestration  
- **Node Exporter & cAdvisor** – (optional) System and container-level metrics  

---

## 🧩 Architecture

```

```
    +-------------+
    |   Grafana   |
    | (Dashboard) |
    +------+------+
           |
           |  Queries
           v
    +-------------+
    | Prometheus  |
    | (Data Store)|
    +------+------+
           |
```

Scrapes     |
every 5s    v
+-------------+
|  Flask App  |
| (/metrics)  |
+-------------+

````

---

## 🧪 How to Run

1. **Clone the project:**
   ```bash
   git clone https://github.com/<your-username>/flask-monitoring-app.git
   cd flask-monitoring-app
````

2. **Start all containers:**

   ```bash
   docker-compose up -d
   ```

3. **Access the services:**

   * Flask App → [http://localhost:5000](http://localhost:5000)
   * Prometheus → [http://localhost:9090](http://localhost:9090)
   * Grafana → [http://localhost:3000](http://localhost:3000)

---

## 📊 Key Metrics

| Metric Name                   | Description                                           |
| ----------------------------- | ----------------------------------------------------- |
| `app_requests_total`          | Total number of HTTP requests served by the Flask app |
| `app_request_latency_seconds` | Time taken to handle each request (in seconds)        |

These metrics are scraped automatically by Prometheus and visualized in Grafana dashboards that show traffic volume, latency distribution, and overall performance trends.

---

## 🧠 Lessons Learned

* How to **integrate application-level metrics** into a Python/Flask web app.
* Setting up a **Prometheus scrape configuration** to monitor multiple targets.
* Building **Grafana dashboards** that provide real-time insights.
* Understanding how **Docker networking** allows containers to communicate seamlessly.

This project serves as an excellent foundation for **observability pipelines**, and it can easily be extended to include alerting rules, additional exporters, or integration with Kubernetes.

---

## 📷 Screenshots

The [`images/`](./images) directory contains visual examples from the project, including:

* Grafana dashboards displaying live data
* Prometheus targets page confirming successful scrapes
* The running Flask app metrics endpoint
* Docker container view

---

## 🗂️ Project Structure

```
.
├── app/
│   └── main.py
├── prometheus.yml
├── docker-compose.yml
├── images/
│   ├── grafana-dashboard.png
│   ├── prometheus-targets.png
│   ├── flask-metrics.png
│   └── docker-ps.png
└── README.md
```

---

## ✅ Summary

This project is a compact yet complete demonstration of **modern DevOps observability practices** — combining application metrics, container monitoring, and real-time visualization.
It’s designed to showcase practical skills in **monitoring, containerization, and infrastructure configuration** — essential capabilities for any DevOps or SRE engineer.

