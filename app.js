// Import required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db= require("./db/db")
const routeUser= require("./routes/user.routes");
const routeCompania= require("./routes/compania.routes");
// Create an Express app
const app = express();
const port = 3000; // Change this to your desired port

// Enable CORS for all routes
app.use(cors());
// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.json()); // JSON parsing middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/',(req,res,next)=>{
    res.send("ESTA ES UNA API")
})
app.use('/user',routeUser);
app.use('/compania',routeCompania);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    db
});