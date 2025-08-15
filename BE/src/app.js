const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();

app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(uri);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
