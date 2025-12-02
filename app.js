// Import express and mongooese packages
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
//import router
const routes = require('./Routers/index');


const host = "localhost";
const port = process.env.PORT || 8900;
// MogngoDB connecting string

// const uri = "mongodb+srv://Zoufisha:Zoufi2021@cluster0.40etm.mongodb.net/DB-1?retryWrites=true&w=majority";
const uri = process.env.URI;

const app = express();
// Middleware to handle json date
app.use(express.json());

// Handling CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
    next();
})

// Navigate all req to router
app.use('/', routes);

// Connect to Database and starting server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }).
    catch((err) => {
        console.log(err);
    }
    )
