const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 1337));

nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.use(express.static(path.join(__dirname, '/public')));


app.use(require('./routes'));


// ***** Catch any request not handled in routes ***** //
app.use(function (req, res, next) {
  const err = new Error('errororororor');
  err.status = 404;
  next(err);
});

// ***** Error handling ***** //
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

app.listen(app.get('port'), function () {
  console.log(`Ooooooh, port #${app.get('port')} is pinging`);
});
