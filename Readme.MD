# Project Setup and Installation

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Docker
- **Windows**: Install [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/).
- **Linux**: Follow the instructions on [Docker's official documentation](https://docs.docker.com/engine/install/).

### Node.js
- Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

### Git
- Make sure you have Git installed. You can download it from [Git's official website](https://git-scm.com/).

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/makdawoodi1/tasks-management.git
   cd tasks-management
   ```

2. **Create a `.env` File**
   - Rename the `.env.example` file to `.env`, which is pre-configured with the required environment variables for the project. If Docker doesn't run, replace the `.env.example` with `.env` and use the pre-configured environment variables in the `packages/backend` directory.

3. **Build and Run the Docker Containers**
   - To start the entire application, run the following command:
   ```bash
   make local
   ```

4. **Access the Application**
   - The frontend should be accessible at `http://localhost:5173`.
   - The backend API should be accessible at `http://localhost:3001`.

## Manual Start (if Docker fails)

If you encounter issues with Docker, you can manually run the frontend and backend services. However, you must first start the PostgreSQL service using Docker:

1. **Start PostgreSQL Service**
   ```bash
   docker-compose up -d bp_pg_db
   ```

2. **Run Backend**
   - Navigate to the backend directory and run:
   ```bash
   npm install
   npm run start:dev
   ```

3. **Run Frontend**
   - Navigate to the frontend directory and run:
   ```bash
   npm install
   npm run dev
   ```

## Additional Notes

- Ensure that the PostgreSQL service is running before starting the backend.
- You may need to adjust the ports in the `.env` file if there are conflicts with other services running on your machine.
- Additionally, the API_BASE_URL used by the frontend is configured in the `config.ts` file. You may need to update the URL as necessary to ensure proper communication between the frontend and backend.

## Troubleshooting

- If you encounter issues, check the logs of the Docker containers using:
  ```bash
  docker-compose logs
  ```
- Ensure that your environment variables in the `.env` file are correctly set.

Happy coding!
