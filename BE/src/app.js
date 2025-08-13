const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const Blog = require('./database/models/Blog');

const uri =
  'mongodb+srv://ntanh0393:Guitarway123@cluster0.kvtkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
// app.use(cors);

app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/blog', (req, res) => {
  const blogA = new Blog({ title: 'Blog A' });
  blogA.save();
  res.send(blogA.title);
});

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

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
