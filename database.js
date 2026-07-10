const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "hayabusa.proxy.rlwy.net",
  user: "root",
  password: "CyyYwXvKvYfQjLpHuJAfYOQyOjogAhYJ",
  database: "railway",
  port: 20477
});

db.connect((err) => {
  if (err) {
    console.log("❌ Connection Failed:", err);
  } else {
    console.log("✅ Database Connected Successfully!");
  }
});

module.exports = db;