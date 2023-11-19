
# Coffee Delivery Platform

Craving the perfect cup of coffee? Look no further than our Coffee Delivery platform!

# Features

User Management: Perform CRUD operations on users.

# Local Installation Guide

 1. Clone the Repository:
```bash
git remote add origin https://github.com/ViniOkamoto/coffee-delivery.git
cd coffee-delivery
```
2. Install Prerequisites:

Make sure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/) installed on your local machine.

3. Configure Environment Variables:
Set up the required environment variables as per the example provided in .env.example.

4. Run the Application:
```bash

docker compose up -d
npm i
npx prisma generate
npx prisma push
npm run start:dev
```

5. Verify Success:

If the setup is successful, you should see the following message in your terminal:

```bash

🚀  Server running on port 3000

```

Feel free to explore and enjoy your coffee experience with our Coffee Delivery platform!