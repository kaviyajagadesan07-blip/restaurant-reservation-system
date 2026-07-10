const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "savoryspace_db",
    dateStrings: true
});

db.connect((err) => {
    if (err) {
        console.log("Database Error:", err);
    } else {
        console.log("Database Connected");
    }
});

// Add Booking
app.post("/book", (req, res) => {

    const { name, phone, date, booking_time, people } = req.body;

    const sql =
        "INSERT INTO guest_reservations (name, phone, date, booking_time, people) VALUES (?, ?, ?, ?, ?)";

    db.query(
        sql,
        [name, phone, date, booking_time, people],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error");
            }

            res.send("Booking Saved");
        }
    );
});

// Get All Bookings
app.get("/bookings", (req, res) => {

    db.query(
        "SELECT * FROM guest_reservations ORDER BY id ASC",
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).send("Error");
            }

            res.json(result);
        }
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});