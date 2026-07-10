const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Add Booking
app.post("/book", (req, res) => {
    const { name, phone, date, booking_time, people } = req.body;

    const sql = `
        INSERT INTO guest_reservations
        (name, phone, date, booking_time, people)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, phone, date, booking_time, people],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Database Error" });
            }

            res.json({ message: "Booking Saved Successfully" });
        }
    );
});

// Get All Bookings
app.get("/bookings", (req, res) => {
    const sql = "SELECT * FROM guest_reservations ORDER BY id ASC";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }

        res.json(result);
    });
});

// Home Route
app.get("/", (req, res) => {
    res.send("Restaurant Reservation API is Running");
});

// Render Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});