# Serverless Notes App (AWS)

This is a **serverless notes application** deployed on AWS using **Terraform**.  
The project demonstrates a fully automated infrastructure deployment for a serverless API, with backend storage and permissions configured programmatically.

---

## Project Overview

The application allows users to create, read, and manage notes via a RESTful API. It is fully **serverless**, leveraging:

- **AWS Lambda** – Handles all API requests and business logic.
- **Amazon API Gateway (HTTP API)** – Exposes the Lambda functions as HTTP endpoints.
- **Amazon DynamoDB** – Serves as the database to store notes.
- **AWS IAM Roles and Policies** – Securely grant permissions for Lambda to access DynamoDB.

---

[Client] --> [API Gateway] --> [Lambda Function] --> [DynamoDB]

- **API Gateway** receives HTTP requests (ANY /{proxy+}) and routes them to Lambda.
- **Lambda** processes the request and interacts with DynamoDB.
- **DynamoDB** stores all notes, using `id` as the primary key.

---

## Technologies & Tools

- **Terraform** – Infrastructure as Code (IaC)
- **AWS Lambda** – Serverless compute
- **AWS API Gateway v2 (HTTP API)** – REST API routing
- **AWS DynamoDB** – NoSQL database
- **Node.js 18.x** – Lambda runtime
- **Windows PowerShell / curl** – For testing API endpoints

---

## Terraform Resources Created

1. **API Gateway HTTP API** (`aws_apigatewayv2_api`)
2. **Lambda Function** (`aws_lambda_function`)
3. **Lambda IAM Role** (`aws_iam_role`) with inline policy (`aws_iam_role_policy`) granting DynamoDB access
4. **DynamoDB Table** (`aws_dynamodb_table`)
5. **API Gateway Integration** (`aws_apigatewayv2_integration`)
6. **API Gateway Route** (`aws_apigatewayv2_route`)
7. **API Gateway Stage** (`aws_apigatewayv2_stage`)
8. **Lambda Permissions** (`aws_lambda_permission`) allowing API Gateway to invoke Lambda

---

## Deployment Instructions

> ⚠️ Before deploying, ensure your AWS CLI is configured with credentials and the default region is set (e.g., `eu-north-1`).

1. **Initialize Terraform**

```powershell
terraform init

Plan the deployment
terraform plan

Apply the infrastructure
terraform apply -auto-approve
Check outputs

Terraform outputs the API endpoint URL and DynamoDB table name:
api_endpoint = "https://<api-id>.execute-api.eu-north-1.amazonaws.com"
dynamodb_table = "serverless-notes-api-notes"

Testing the API

You can test the API using PowerShell curl:

GET all notes:

curl https://<api-endpoint>/


POST a new note:

curl -Method POST https://<api-endpoint>/ `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"id": "1", "title": "My First Note", "content": "This is a test note."}'


Response example:

{
  "id": "2cc8a0ab-0ef9-422a-a22c-7f70b7bae9e9",
  "title": "My First Note",
  "content": "This is a test note.",
  "createdAt": "2025-10-09T09:36:20.551Z"
}

Cleanup

To avoid AWS charges after testing, destroy all resources:

terraform destroy -auto-approve

Project Highlights

Fully automated infrastructure deployment with Terraform.

Demonstrates serverless architecture best practices.

Shows integration of API Gateway, Lambda, and DynamoDB.

Simple but functional notes API, suitable for portfolio display.

you can see screendhots from the project in the images directory