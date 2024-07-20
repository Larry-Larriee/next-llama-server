const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const puppeteer = require("puppeteer");

// config() loads environment variables in process.env object (object built into node.js)
require("dotenv").config();

// Create a MongoClient to access the database
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connects to the database without closing the connection (doing so would be redundant for everyone making HTTP requests to server)
async function connectToDB() {
  try {
    // Connect the client to the server and send a ping
    await client.connect();
    // admin is a built-in database
    await client.db("admin").command({ ping: 1 });

    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("error: " + error);
  }
}
connectToDB();

// node.js runs top to bottom. Once the sever connects to mongoDB, locate the tailwind collection
const tailwindCollection = client
  .db(process.env.MONGODB_DATABASE)
  .collection(process.env.MONGODB_COLLECTION);

// find everything
let tailwindSampleData = () => {
  tailwindCollection
    .find({})
    .toArray()
    .then((result) => {
      console.log("tailwindCollection: ", result);
    });
};
// tailwindSampleData();

const app = express();
// allow client to make requests to server (allowing all origins at the moment)
app.use(cors({}));

// testing server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// puppeteer.launch().then(async (browser) => {
//   const page = await browser.newPage();
//   await page.goto("https://example.com");
//   await page.screenshot({ path: "example.png" });

//   await browser.close();
// });
