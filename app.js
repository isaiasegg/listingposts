const compression = require('compression'); 
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv'); dotenv.load(); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true } ); 
app.use(compression());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('json spaces', 2);

const routes = require('./api/routes/routes');

// Secure traffic only
app.all('*', function(req, res, next) {
  if (process.env.REDIRECTURL === 'http://localhost:3000') {
    return next();
  } else if (req.headers['x-forwarded-proto'] === 'https') {
    return next();
  } else {
  res.redirect('https://' + req.hostname + req.url);
  }
});

// webhook
routes.all(app); 

app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// Sets server port and logs message on success
let server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %s', server.address().port);
});


