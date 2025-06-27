const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const tmdRoute = require('./routes/tmdbRoutes')
dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'https://movie-recommendation-app-fkow.vercel.app/'],
    credentials: true,
}));
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

app.use('/', authRoutes)
app.use('/', tmdRoute)


app.listen(process.env.port, ()=> {
    console.log(`server running on http://localhost:${process.env.port}`)
})