const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "your_password",
  database: "restaurant",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("❌ Connection Failed:", err.message);
  } else {
    console.log("✅ Database Connected Successfully!");
  }
});