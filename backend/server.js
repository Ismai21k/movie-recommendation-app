const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middkeware/authMiddleware')
const movieRoute = require('./routes/movieRoutes')

dotenv.config();

const app = express();
const port = 300;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("APIs is running......");
});


mongoose.connect(process.env.mongo_url)
.then(() => {
    console.log('MongoDB Conneted');
} ).catch((err) => {
    console.log(err)

});

app.use('/api/auth', authRoutes)
app.use('/api', movieRoute)


app.listen(process.env.port, ()=> {
    console.log(`server running on http://localhost:${process.env.port}`)
})