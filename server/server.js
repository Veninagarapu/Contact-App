const express = require("express");
const connectDB = require("./db/db"); // Ensure database connection
const cors = require("cors"); // Allow frontend access
const routes = require("./routes/contactRoute"); // Import routes

const app = express();
const PORT = process.env.PORT || 5003;

// dotenv.config();
connectDB();


// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend communication

// Routes
app.use("/api", routes);

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log(`Port ${PORT} in use, trying another...`);
        server.listen(0); // 0 tells Node.js to use any available port
    } else {
        console.error(err);
    }
});
