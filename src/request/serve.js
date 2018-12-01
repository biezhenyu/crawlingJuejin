const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.post('/signup', (req, res) => {
  let user = req.body;
  res.json(user)
})

app.listen('8080')