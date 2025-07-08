# QuizBuilder

## How to run the project

FrontEnd folder: Create .env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5001

Backend folder: Create .env 
    DATABASE_URL="postgresql://admin:admin@postgres:5432/myTestCluster"
    PORT=5001

### 1. Start with Docker Compose

In the project root, simply run:

```bash
docker-compose up --build
