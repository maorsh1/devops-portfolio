from flask import Flask, Response
from prometheus_client import Counter, Histogram, generate_latest

app = Flask(__name__)

REQUEST_COUNT = Counter('app_requests_total', 'Total HTTP Requests')
REQUEST_LATENCY = Histogram('app_request_latency_seconds', 'HTTP Request latency in seconds')

@app.route('/')
def home():
    with REQUEST_LATENCY.time():
        REQUEST_COUNT.inc()
        return "Hello from Flask!"

@app.route('/metrics')
def metrics():
    return Response(generate_latest(), mimetype='text/plain')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
