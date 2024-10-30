const express = require('express');
const userController = require('./routes');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.get('/test', async (req, res) => {
  console.log('Test');
  res.status(200).send('Hello, World!!');
});

app.use(userController)

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
});