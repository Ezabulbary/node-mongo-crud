const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user: userdb1
// password: pPcgreFEjsR4UcR9


const uri = "mongodb+srv://userdb1:pPcgreFEjsR4UcR9@cluster0.ov6df.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // get user
        app.get('/user', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.get('/user/:id', async(req, res) =>{
            const id = req.params.id;
            const query = { _id: objectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // POST user: add a new user;
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        // update user

        app.put('/user/:id', async(req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: objectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // delete user
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: objectId(id)};
            const result = await userCollection.deleteOne(query);
            console.log(result)
            res.send(result);
        })
    } 
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running my node CRUD Server');
})

app.listen(port, () => {
    console.log('CRUD Server is Running');
})