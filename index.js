const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// user: userdb1
// password: pPcgreFEjsR4UcR9


const uri = "mongodb+srv://userdb1:pPcgreFEjsR4UcR9@cluster0.ov6df.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





app.get('/', (req, res) => {
    res.send('Running my node CRUD Server');
})

app.listen(port, () => {
    console.log('CRUD Server is Running');
})