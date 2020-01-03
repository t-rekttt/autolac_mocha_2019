let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let apiRouter = require('./api.js');

let app = express();

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'notASecretSinceImGoingToOpenSourceThis'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Server started');
});