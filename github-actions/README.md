# HelloWorldApp - CI/CD Pipeline with GitHub Actions

This project started as a **home assignment** I received during a hiring process for a DevOps Engineer position in a major company.
Although I did not get the job, I successfully completed the assignment and decided to include it in my **DevOps portfolio**, as it demonstrates my hands-on skills in CI/CD, containerisation, and automation.
You can see images from the project in the images folder.
---

## 📌 Project Goals
The main objective of the assignment was to design and automate a **full CI/CD workflow** around a minimal `.NET 8` application.  
Key requirements included:
- Develop a minimal **.NET 8 app** that prints *"Hello World"*.
- Add at least one **unit test** with `xUnit`/`NUnit`.
- Write a **multi-stage Dockerfile** to build a slim image.
- Create a **GitHub Actions workflow** (`ci-cd.yml`) to:
  - Restore, build, test, and publish the app.
  - Derive semantic versioning from Git tags.
  - Build and push a Docker image to Docker Hub using **GitHub Secrets**.
  - Run the container inside the pipeline and validate output.
  - (Bonus) Scan the image for vulnerabilities with **Trivy**.
- Provide clear documentation (`README.md`) with build/run instructions and a status badge.

---

## 🚀 Usage

Clone and run locally:

```bash
git clone https://github.com/maorsh1/home-assignment.git
cd home-assignment
dotnet build
dotnet run

docker build -t maorsh6/hello-world:latest .
docker run --rm maorsh6/hello-world:latest


🔄 CI/CD Pipeline
The pipeline is triggered on every push to the main branch.
 Steps include:
Checkout code


Setup .NET 8


Restore, build, test, publish the app


Build, scan, and push Docker image to Docker Hub


Run container in pipeline and validate output


Status badge (in the original repo):  
[![CI/CD Pipeline](https://github.com/maorsh1/home-assignment/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/maorsh1/home-assignment/actions/workflows/ci-cd.yml)

 

🔑 GitHub Secrets
To enable the pipeline, the following secrets must be configured in the repository settings:
DOCKERHUB_USER → Docker Hub username (maorsh6)


DOCKERHUB_TOKEN → Docker Hub password or access token



🛠️ Tech Stack
.NET 8


xUnit (unit testing)


Docker (multi-stage build)


GitHub Actions (CI/CD)


Trivy (container security scanning)



📚 Notes
This project demonstrates:
My ability to build and automate end-to-end CI/CD pipelines.


Best practices for Docker image optimisation and security.


Working with GitHub Actions, secrets management, and Docker Hub integration.


It also shows how I can take a real-world hiring assignment and turn it into a polished project for my portfolio.

👤 Created by Maor Sh
 Contact me for questions or collaboration.
