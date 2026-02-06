require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const https = require('https');
const fs = require('fs');

// Import routes
const routes = require("./routes/routes");
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/Admin/adminRoutes");

// Import middleware
const errorHandler = require("./middlewares/errorMiddleware");

// Initialize Express app
const app = express();

// 1. DATABASE CONNECTION
connectDB();

// 2. GLOBAL MIDDLEWARES

// Security headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// HTTPS Configuration
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/efuelindia.com/privkey.pem'),  // e.g., /etc/letsencrypt/live/api.yourdomain.com/privkey.pem
  cert: fs.readFileSync('/etc/letsencrypt/live/efuelindia.com/fullchain.pem') // e.g., /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem
};

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (!req.secure && req.get('X-Forwarded-Proto') !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// 3. ROUTES
app.use("/api/v1", routes);
app.use("/api/v1/data", dataRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running healthy",
  });
});

// 4. ERROR HANDLING
app.use(errorHandler);

// 5. START SERVER
const port = process.env.PORT || 5000;

// Create HTTPS server
const server = https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});


// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection Error:", err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception Error:", err.message);
  server.close(() => {
    process.exit(1);
  });
});
