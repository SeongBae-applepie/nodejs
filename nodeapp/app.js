

/*
var express = require('express');
var router = express.Router();


     router.get('/', function(req, res, next) {
       // res.send(req.body.userEmail);

         res.send('connect');
       });


      router.get('/data', function(req, res, next) {
          res.send("습도:40, 온도: 10 ");

      });

module.exports = router;
*/

/*

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var router = express.Router();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/a', (req, res) => {
  res.send('aHello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


router.get('/data', function(req, res, next) {
    res.send("습도:40, 온도: 10 ");

});


 module.exports = router;


 */


 const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  const name = req.query.name;
  fs.writeFileSync('data.txt', `${name}\n`);
  res.send('Hello, ${name}!');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
