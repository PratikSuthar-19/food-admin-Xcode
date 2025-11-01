// import 'dotenv/config';
// import connectDB from '../config/db.js';
// import User from '../models/User.js';

// const run = async () => {
//   await connectDB();
//   const exists = await User.findOne({ email: 'admin@example.com' });
//   if (!exists) {
//     const user = await User.create({ name: 'Admin', email: 'admin@example.com', mobile: '9999999999', password: 'password123', role: 'admin' });
//     console.log('Admin created:', user.email);
//   } else {
//     console.log('Admin already exists');
//   }
//   process.exit();
// };

// run();

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import connectDB from "../config/db.js";

// import User from "../models/User.js";
// import Category from "../models/Category.js";
// import Product from "../models/Product.js";
// import Order from "../models/Order.js";

// dotenv.config();

// await connectDB();

// const seedData = async () => {
//   try {
//     console.log("🧹 Clearing old data...");
//     await User.deleteMany();
//     await Category.deleteMany();
//     await Product.deleteMany();
//     await Order.deleteMany();

//     console.log("🌱 Seeding fresh data...");

//     // 🔹 1. Create Admin
//     const adminPassword = await bcrypt.hash("Admin@123", 10);
//     const admin = await User.create({
//       name: "Admin",
//       email: "admin@example.com",
//       mobile: "9999999999",
//       password: adminPassword,
//       role: "admin"
//     });

//     // 🔹 2. Create Some Users
//     const users = await User.insertMany([
//       {
//         name: "John Doe",
//         email: "john@example.com",
//         mobile: "9876543210",
//         password: await bcrypt.hash("John@123", 10),
//         role: "user"
//       },
//       {
//         name: "Jane Smith",
//         email: "jane@example.com",
//         mobile: "9988776655",
//         password: await bcrypt.hash("Jane@123", 10),
//         role: "user"
//       }
//     ]);

//     // 🔹 3. Create Categories
//     const categories = await Category.insertMany([
//       { name: "Pizza", description: "Delicious cheesy pizzas" },
//       { name: "Burger", description: "Juicy burgers with fries" },
//       { name: "Beverages", description: "Cool drinks and shakes" }
//     ]);

//     // 🔹 4. Create Products
//     const products = await Product.insertMany([
//       {
//         name: "Margherita Pizza",
//         categoryId: categories[0]._id,
//         price: 299,
//         status: "available"
//       },
//       {
//         name: "Farmhouse Pizza",
//         categoryId: categories[0]._id,
//         price: 399,
//         status: "available"
//       },
//       {
//         name: "Cheese Burger",
//         categoryId: categories[1]._id,
//         price: 199,
//         status: "available"
//       },
//       {
//         name: "Coke",
//         categoryId: categories[2]._id,
//         price: 99,
//         status: "available"
//       }
//     ]);

//     // 🔹 5. Create Orders
//     const orders = await Order.insertMany([
//       {
//         userId: users[0]._id,
//         items: [
//           {
//             productId: products[0]._id,
//             quantity: 2,
//             price: products[0].price
//           },
//           {
//             productId: products[3]._id,
//             quantity: 1,
//             price: products[3].price
//           }
//         ],
//         totalAmount: products[0].price * 2 + products[3].price,
//         orderDate: new Date()
//       },
//       {
//         userId: users[1]._id,
//         items: [
//           {
//             productId: products[2]._id,
//             quantity: 3,
//             price: products[2].price
//           }
//         ],
//         totalAmount: products[2].price * 3,
//         orderDate: new Date()
//       }
//     ]);

//     console.log("✅ Database seeded successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Seeding failed:", error);
//     process.exit(1);
//   }
// };

// seedData();

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import connectDB from "../config/db.js";

// import User from "../models/User.js";
// import Category from "../models/Category.js";
// import Product from "../models/Product.js";
// import Order from "../models/Order.js";

// dotenv.config();
// await connectDB();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

import User from "../models/User.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

dotenv.config();

await connectDB();

const getDateDaysAgo = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const seedData = async () => {
  try {
    console.log("🧹 Clearing old data...");
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("🌱 Seeding new data...");

    // 👤 Users (2)
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        mobile: "9876543210",
        password: await bcrypt.hash("John@123", 10),
        role: "user"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        mobile: "9988776655",
        password: await bcrypt.hash("Jane@123", 10),
        role: "user"
      }
    ]);

    // 🍕 Categories (4)
    const categories = await Category.insertMany([
      { name: "Pizza", description: "Fresh baked pizzas with cheese and toppings" },
      { name: "Burger", description: "Juicy burgers with fries" },
      { name: "Beverages", description: "Refreshing soft drinks and shakes" },
      { name: "Desserts", description: "Sweet dishes and ice creams" }
    ]);

    // 🛍️ Products (8)
    const products = await Product.insertMany([
      {
        name: "Margherita Pizza",
        categoryId: categories[0]._id,
        price: 299,
        status: "available",
        imageUrl: "/uploads/margherita.jpg"
      },
      {
        name: "Farmhouse Pizza",
        categoryId: categories[0]._id,
        price: 399,
        status: "available",
        imageUrl: "/uploads/farmhouse.jpg"
      },
      {
        name: "Cheese Burger",
        categoryId: categories[1]._id,
        price: 199,
        status: "available",
        imageUrl: "/uploads/cheeseburger.jpg"
      },
      {
        name: "Chicken Burger",
        categoryId: categories[1]._id,
        price: 249,
        status: "available",
        imageUrl: "/uploads/chickenburger.jpg"
      },
      {
        name: "Coke",
        categoryId: categories[2]._id,
        price: 99,
        status: "available",
        imageUrl: "/uploads/coke.jpg"
      },
      {
        name: "Cold Coffee",
        categoryId: categories[2]._id,
        price: 149,
        status: "available",
        imageUrl: "/uploads/coldcoffee.jpg"
      },
      {
        name: "Chocolate Brownie",
        categoryId: categories[3]._id,
        price: 199,
        status: "available",
        imageUrl: "/uploads/brownie.jpg"
      },
      {
        name: "Ice Cream Sundae",
        categoryId: categories[3]._id,
        price: 249,
        status: "available",
        imageUrl: "/uploads/sundae.jpg"
      }
    ]);

    // 🧾 Orders (7 total — over last 7 days)
    const ordersData = [
      {
        userId: users[0]._id,
        items: [
          { productId: products[0]._id, quantity: 1, price: products[0].price },
          { productId: products[4]._id, quantity: 1, price: products[4].price }
        ],
        totalAmount: 398,
        orderDate: getDateDaysAgo(0) // today
      },
      {
        userId: users[1]._id,
        items: [
          { productId: products[1]._id, quantity: 2, price: products[1].price }
        ],
        totalAmount: 798,
        orderDate: getDateDaysAgo(1)
      },
      {
        userId: users[0]._id,
        items: [
          { productId: products[2]._id, quantity: 1, price: products[2].price },
          { productId: products[5]._id, quantity: 1, price: products[5].price }
        ],
        totalAmount: 348,
        orderDate: getDateDaysAgo(2)
      },
      {
        userId: users[1]._id,
        items: [
          { productId: products[6]._id, quantity: 1, price: products[6].price }
        ],
        totalAmount: 199,
        orderDate: getDateDaysAgo(3)
      },
      {
        userId: users[0]._id,
        items: [
          { productId: products[3]._id, quantity: 2, price: products[3].price },
          { productId: products[7]._id, quantity: 1, price: products[7].price }
        ],
        totalAmount: 747,
        orderDate: getDateDaysAgo(4)
      },
      {
        userId: users[1]._id,
        items: [
          { productId: products[0]._id, quantity: 1, price: products[0].price },
          { productId: products[4]._id, quantity: 2, price: products[4].price }
        ],
        totalAmount: 497,
        orderDate: getDateDaysAgo(5)
      },
      {
        userId: users[0]._id,
        items: [
          { productId: products[5]._id, quantity: 2, price: products[5].price },
          { productId: products[6]._id, quantity: 1, price: products[6].price }
        ],
        totalAmount: 497,
        orderDate: getDateDaysAgo(6)
      }
    ];

    await Order.insertMany(ordersData);

    console.log("✅ Database seeded successfully with last 7 days data!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
