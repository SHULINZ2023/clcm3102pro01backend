const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shulinz:mongoDB@23@cluster0.tvtevfo.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const app = express();

app.use(bodyParser.json());

app.post('/rating', (req, res) => {
    async function connect() {
        try {
          await client.connect();
          console.log('Connected to MongoDB');
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
        }
      }
      
      connect();
      
      const db = client.db('RatingSystem'); // Get the database instance

async function insertRating() {
  const ratingCollection = db.collection('RatingProduct');

  try {
    const result = await ratingCollection.insertOne({
      comments: 'Sample Product is nice ',
      rating: 4,
    });

    console.log('Inserted product with ID:', result.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
  }
}

insertRating();

  res.send('Hello, API!');


});

const port = 3500;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

