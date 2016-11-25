const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();
const port = 1337;

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.render('layout');
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const err = new Error('errororororor');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(err.status || 500);
});

app.listen(port, function () {
  console.log('ooooh my ping', port);
});
