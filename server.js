// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const gameRoutes = require("./routes/gameRoutes");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use("/api/games", gameRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     app.listen(process.env.PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http"); // Serverless integration
const gameRoutes = require("./routes/gameRoutes");

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/games", gameRoutes);  // Correct the route for games

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Instead of app.listen, export as a serverless function for Vercel
module.exports = serverless(app); // Export the app as a serverless function
