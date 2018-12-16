const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  app.use(express.static(__dirname + '/src'));
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/history', function (req, res) {
  res.sendFile(path.join(__dirname + '/history.html'));
});

var obj = {
  data: ''
};

app.post('/send', function (req, res) {
  let body = req.body.data;
  const filePath = __dirname + '/src/text.json';

  fs.readFile(filePath, 'utf8', function(err, data) {
      const kek = JSON.parse(data);
      body = String(kek.data) + String(body);
      obj.data = body;
      var json = JSON.stringify(obj);

      fs.writeFile(filePath, json, function() {
          res.end();
      });
  });

  res.send('POST request to the homepage');
});

app.listen(3000);