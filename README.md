■ Food Admin Dashboard
A full-stack admin panel for managing food products, categories, users, and orders.
Admins can create, update, and track sales metrics with image uploads and real-time data
visualization.

■ Tech Stack
Frontend: React + Vite + TypeScript + TailwindCSS + Recharts
Backend: Node.js + Express + MongoDB + Mongoose + JWT Auth + Multer

■■ Setup Instructions
Backend Setup:
1. cd server
2. npm install
3. Create .env file:
MONGO_URI='your_mongodb_connection_string'
JWT_SECRET='your_secret_key'
PORT=5000
4. node scripts/seed.js
5. npm run dev
   
Frontend Setup:
1. cd frontend
2. npm install
3. Create .env file:
VITE_API_URL='http://localhost:5000'
4. npm run dev
   
■ Features
• Add, edit, delete categories and products
• Upload and display product images
• View total users, products, and orders
• Dashboard analytics (sales & users over time)
• JWT-based secure authentication
• Responsive, modern UI with charts and icons

■ API Routes

Auth:
POST /api/auth/login
POST /api/auth/register

Products:
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

Categories:
GET /api/categories
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id

Orders:
GET /api/orders
POST /api/orders
