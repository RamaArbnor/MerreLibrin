const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
require("dotenv").config("./.env");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.URI;
const DB_NAME = "MerreLibren"; 
const COLLECTION_NAME = "shpalljet"; // Replace with your collection name

// Add a new entry to the database
app.post("/add", async (req, res) => {
  const entry = req.body;

//   if (!name || !phone || !books) {
//     return res.status(400).json({ message: "Invalid request body" });
//   }

  try {
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // const newEntry = { name, phone, books };
    const result = await collection.insertOne(entry);

    client.close();

    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
