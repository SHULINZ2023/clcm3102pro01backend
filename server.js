const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Global middleware to log all requests
app.use(cors());

const port = process.env.PORT || 3000;


// Route handling
app.post('/insertRating',(req,res)=>
{
    console.log(req.body);
    const comments = req.body.comments;
    const rating   = req.body.rating;
    const routine_id = req.body.routine_id;
    const currentDate = new Date();
    console.log(comments);
    console.log(`receive product rating ${comments}`);
    
    console.log(`insert feed with ${routine_id}`);
async function insertRating() {
  const connection = await mysql.createConnection({
      host: 'myfirstmysqlazureshulin.mysql.database.azure.com',
      user: 'shulinz',
      password: 'root2023.yyc',
      database: 'MyTest',
  });

  try {
      const [rows, fields] = await connection.execute('INSERT INTO fitiness_routine_feed (routine_id, comments, rating, ratingtime) VALUES (?,?, ?, ?)',
      [routine_id,comments,rating,currentDate]);
      console.log(rows); // Process the results
      res.send('{received the rating');
  } catch (error) {
      console.error('Error executing query:', error);
  } finally {
      connection.end(); // Close the connection
  }
}  

insertRating();

}
)
app.get('/GetRating', (req, res) => {
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function getRating() {
  const connection = await mysql.createConnection({
      host: 'myfirstmysqlazureshulin.mysql.database.azure.com',
      user: 'shulinz',
      password: 'root2023.yyc',
      database: 'MyTest',
  });

  try {
      const routine_id = req.query.routine_id;
      console.log(routine_id);
      const [rows, fields] = await connection.execute(`SELECT comments,rating FROM fitiness_routine_feed where routine_id=${routine_id} `);
      res.json(rows);
  } catch (error) {
      console.error('Error executing query:', error);
  } finally {
      connection.end(); // Close the connection
  }
}

      getRating();
     // client.close();
 

});
app.get('/GetFitnessRoutines', (req, res) => {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    console.log("GetFitnessRoutines");
    async function getFitnessRoutines() {
      const connection = await mysql.createConnection({
          host: 'myfirstmysqlazureshulin.mysql.database.azure.com',
          user: 'shulinz',
          password: 'root2023.yyc',
          database: 'MyTest',
          ssl: {ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")}
      });
    
      try {
        const querysql = 'select p.routine_id,p.routine_name,p.goal,date(p.start_date) as start_date,p.motivation,' + 
        'coalesce(t1.avg_rating,0) as avg_rating from fitness_routine p left outer join ' +
        '(select routine_id, avg(rating) as avg_rating from fitiness_routine_feed ' +
         ' group by routine_id ) T1 on p.routine_id = t1.routine_id';
        console.log("GetFitnessRoutines");
          const [rows, fields] = await connection.execute(querysql);
          res.json(rows);
      } catch (error) {
          console.error('Error executing query:', error);
      } finally {
          connection.end(); // Close the connection
      }
    }
    
    getFitnessRoutines();
         // client.close();
     
    
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
