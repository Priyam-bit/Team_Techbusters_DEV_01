const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Router } = require('express');
const NGOController = require('./Controllers/NGOController');
const PhilathropistController = require('./Controllers/PhilanthropistController');
const GroupController = require('./Controllers/GroupController');
const PostController = require('./Controllers/PostController');

dotenv.config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB")
})


// body parsor, whenever we make a post request
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.get('/', (req,res) => {
    res.status(200).json({"n" : "bd"});
})

app.use('/api/ngo', NGOController);
app.use('/api/philanthropist', PhilathropistController)
app.use('/api/group', GroupController)
app.use('/api/posts', PostController)

app.listen(8000, () => {
    console.log("Server now listening on port 3000")
})