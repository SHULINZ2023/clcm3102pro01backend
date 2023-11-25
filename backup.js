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