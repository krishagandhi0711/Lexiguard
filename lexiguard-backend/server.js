const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));

app.get("/api/uploads", (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Cannot read uploads folder" });
    const fileList = files.map((file) => ({
      filename: file,
      url: `/uploads/${file}`,
      type: file.split(".").pop().toUpperCase(),
      uploaded_at: new Date().toISOString(),
    }));
    res.json(fileList);
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
