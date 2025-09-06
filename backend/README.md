EcoFinds Backend - Sustainable Second-Hand Marketplace API
EcoFinds Backend is the robust and scalable RESTful API server powering the EcoFinds sustainable second-hand marketplace. Developed for the Odoo x NMIT Hackathon ’25, this backend handles secure user authentication, product management, cart operations, and purchase history functionalities.

✨ Core Features

The backend implements the essential business logic required to support the frontend MVP:

User Authentication: Secure registration and login with encrypted passwords and JWT-based session management.

User Profile Management: APIs to view and update user information such as display name and email.

Product Listing CRUD: Full create, read, update, and delete operations for product listings, including validation.

Product Browsing & Search: Endpoints to retrieve products, supporting filters by category and keyword-based searches.

Shopping Cart Management: Add, view, update, and remove products in a user’s cart.

Previous Purchases: Access to a user’s purchase history.

Data Persistence: Reliable storage of users, products, carts, and orders using a relational (PostgreSQL) or NoSQL database.

🛠 Tech Stack

Runtime: Node.js

Framework: Express.js for building RESTful APIs

ORM: Sequelize or Mongoose (depending on DB choice)

Authentication: JWT (JSON Web Tokens) for stateless authentication

Security: bcrypt for password hashing

Environment: dotenv for managing environment variables and configurations

🚀 Getting Started

To set up and run the backend server locally, follow these steps:

Clone the repository (if not done yet):

bash
git clone https://github.com/Janani2436/EcoFinds.git
Navigate to the backend directory:

bash
cd EcoFinds/backend
Install project dependencies:

bash
npm install
Create a .env file in the backend directory with the following environment variables:

text
PORT=5000
DATABASE_URL=<your_database_connection_string>
JWT_SECRET=<your_jwt_secret_key>
Start the backend server in development mode:

bash
npm run dev
The API will be running on http://localhost:5000 by default.

💡 Notes

Make sure your database is running and accessible before starting the server.

Use tools like Postman or Insomnia to test API endpoints during development.

For production deployments, consider environment-specific configurations and security best practices.

👩‍💻 Team

Janani

Ashwin Sanjay

Abhinav

Dharun