const express = require('express');
const app = express();
const { getReposByUsername } = require('../helpers/github.js');
const { save, findTop } = require('../database/index.js');

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let { username } = req.body;
  getReposByUsername(username, (err, result) => {
    if (err) {
      console.error('ERROR', err);
    } else {
      save(result, (error, data) => {
        if (error) {
          console.error('ERROR', error);
        } else {
          findTop((e, topRes) => {
            if (e) {
              console.log(e);
            } else {
              res.send(topRes);
            }
          });
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  findTop((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

