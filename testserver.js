const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Global middleware to log all requests
app.use(cors());
app.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next(); // Pass control to the next middleware
});
const uri = "mongodb+srv://shulinz:MongoDB23.@cluster0.tvtevfo.mongodb.net/?retryWrites=true&w=majority";

// Route handling
app.post('/insertRating',(req,res)=>
{
    const comments = req.body.comments;
    const rating   = req.body.rating;
    console.log(comments);
    console.log('receive product rating ${comments}');
    
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

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
        comments: comments,
        rating: rating,
      });
   
      console.log('Inserted product with ID:', result.insertedId);
    } catch (error) {
      console.error('Error inserting document:', error);
    }
  }
  
  insertRating();
  res.send('received the rating${comments}, thanks');
  client.close();
}
)
app.get('/GetRating', (req, res) => {
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      async function connect() {
        try {
          await client.connect();
          console.log('Connected to MongoDB');
        } catch (error) {
          console.error('Error connecting to MongoDB:', error);
        }
      }
    connect();
   // const ratings=[];
    async function getRating() {
        const db = client.db('RatingSystem'); // Get the database instance
        const ratingCollection = db.collection('RatingProduct');
      
        try {
            const cursor = await ratingCollection.find({},{_id: 0, comments: 1, rating: 1 })
            const ratings = await cursor.toArray();
            /*
            while (await cursor.hasNext()) {
                const rating = await cursor.next();
                console.log(rating.comments);
                ratings.push(rating);
                //products.push(product);
              }*/
              res.json(ratings);
              client.close();
          console.log('this request is done!');
        } catch (error) {
          console.error('Error operating document:', error);
        }
      }
      
      getRating();
     // client.close();
 

});

app.listen(3500);
