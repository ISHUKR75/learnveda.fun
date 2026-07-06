# LearnVeda — Infrastructure

This directory contains all infrastructure configuration for LearnVeda's production deployment.

## Directory Structure

```
infrastructure/
├── docker/              # Docker Compose and Dockerfile configs
├── kubernetes/          # K8s manifests (Deployment, Service, Ingress, HPA)
├── terraform/           # IaC for cloud provisioning (AWS/GCP)
├── nginx/               # Nginx reverse proxy and SSL config
├── monitoring/          # Prometheus + Grafana dashboards
├── ci-cd/               # GitHub Actions workflows
└── README.md            # This file
```

## Services Overview

| Service              | Technology          | Port  | Purpose                              |
|---------------------|---------------------|-------|--------------------------------------|
| Web App             | Next.js 15          | 3000  | Main frontend + API routes           |
| Socket Server        | Socket.IO + Node.js | 3001  | Real-time battles + live events      |
| Content Service      | NestJS              | 3002  | Serves NCERT chapter content         |
| AI Service           | FastAPI (Python)    | 3003  | OpenAI GPT-4o wrapper + rate limit   |
| Compiler Service     | Go + Judge0         | 3004  | Code execution (sandboxed)           |
| MongoDB              | MongoDB 7.x         | 27017 | Primary database                     |
| Redis                | Redis 7.x           | 6379  | Session cache, rate limiting, pub/sub|
| Nginx                | Nginx 1.25          | 80/443| Reverse proxy, SSL termination        |

## Quick Start (Docker)

```bash
# Start all services in development
docker-compose -f docker/docker-compose.dev.yml up

# Start all services in production
docker-compose -f docker/docker-compose.prod.yml up -d

# View logs
docker-compose logs -f web

# Scale the web service
docker-compose up --scale web=3
```

## Production Deployment

We use **AWS ECS (Fargate)** for production:
- Fargate tasks for stateless services (web, socket, content, AI, compiler)
- Amazon DocumentDB (MongoDB-compatible) for database
- Amazon ElastiCache (Redis) for caching
- Amazon CloudFront + ALB for load balancing and CDN
- Route53 for DNS

See `terraform/` for the full infrastructure-as-code configuration.

## Environment Variables

All environment variables are managed through AWS Secrets Manager.
Never commit `.env` files to this repository.

Required variables per service are documented in each service's `README.md`.

## SSL/TLS

SSL certificates are managed by Let's Encrypt via Certbot.
See `nginx/ssl/` for configuration.

## Monitoring

- **Metrics**: Prometheus + Grafana (dashboards in `monitoring/grafana/`)
- **Logging**: Winston → CloudWatch Logs
- **Tracing**: OpenTelemetry → AWS X-Ray
- **Uptime**: UptimeRobot + PagerDuty alerts

## CI/CD

GitHub Actions workflows in `ci-cd/`:
- `pr-checks.yml`: lint, type-check, tests on PR
- `deploy-staging.yml`: auto-deploy to staging on merge to `develop`
- `deploy-production.yml`: deploy to production on merge to `main`
