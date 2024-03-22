# Fastify Template Platform

Fastify Template Platform is a quick startup template for your Fastify project. It provides a robust starting point for building scalable and maintainable APIs with Fastify, a fast and low overhead web framework for Node.js.

## Features

- **User Management**: Perform Create, Read, Update, and Delete (CRUD) operations on users. This feature allows you to manage user data effectively.

- **Authentication**: Perform authentication with JSON Web Tokens (JWT). This feature ensures secure access to your application.

## Local Installation Guide

Follow these steps to install and run the Fastify Template Platform on your local machine:

1. **Clone the Repository**:

   Use the following commands to clone the repository and navigate into the project directory:

   ```bash
   git clone https://github.com/ViniOkamoto/fastify-template.git
   cd fastify-template
   ```

2. **Install Prerequisites**:

   Make sure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/) installed on your local machine. These are essential for running the application.

3. **Configure Environment Variables**:

   Set up the required environment variables as per the example provided in .env.example. This file contains the environment variables that the application needs to run properly.

4. **Run the Application**:

   Use the following commands to run the application:

   ```bash
   docker compose up -d
   npm i
   npx prisma migrate dev --name init
   npx prisma studio
   ```

5. **Verify Success**:

   If the setup is successful, you should be able to run the following command and see the server running message:

   ```bash
   npm run start:dev
   ```

   You should see the following message:

   ```
   🚀  Server running on port 3000
   ```

Feel free to explore and update this template to suit your needs. For more information about Fastify, visit the [Fastify Official Website](https://www.fastify.io/).
