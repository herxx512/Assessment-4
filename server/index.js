const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getCars, createCar, updateCar, deleteCar } = require('./controller')

app.get("/api/compliment", getCompliment);

// Feature 1:
app.get("/api/fortune", getFortune)
// Feature 2:
app.get("/api/cars/", getCars)
app.post("/api/cars/", createCar)
// Feature 3:
app.put("/api/cars/:id", updateCar)
// Feature 4:
app.delete("/api/cars/:id", deleteCar)


app.listen(4000, () => console.log("Server running on 4000"));