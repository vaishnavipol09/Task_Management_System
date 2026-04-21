require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();
const PORT = process.env.PORT || 5000    
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));


// static frontend serve
app.use(express.static(path.join(__dirname, "dist")));

// React routing handle
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

 app.listen(PORT, ()=>console.log(`Server is listening port ${PORT}`));