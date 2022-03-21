const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// mallware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhhgc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const database = client.db('mecare');
        const reviewCollection = database.collection('mereview');

        //addReview
        app.post('/addReview', async (req, res) => {
            const result = await reviewCollection.insertOne(req.body);
            res.send(result);
        })

        //get all review
        app.get('/allReview', async (req, res) => {
            const review = await reviewCollection.find({}).toArray();
            res.send(review);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello MeCare')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})