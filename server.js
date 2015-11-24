import path from 'path';
import { exec } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import * as jodel from 'jodel';

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  const config = require('./webpack.config.babel');
  const compiler = require('webpack')(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

const getToken = (req, res, next) => {
  req.token = req.query.token || req.headers.plebtoken || process.env.DEFAULT_TOKEN;
  if (!req.token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  next();
};

const posts = (resource) => (req, res) => {
  jodel[resource](req.token).then(
    result => res.json(result),
    err => res.status(err.response.statusCode).json({ message: err.message })
  );
};

function makeNewTorIdentity(callback) {
  exec('killall -HUP tor', callback);
}

const vote = (upOrDown) => (req, res) => {
  jodel.getAccessTokenForNewDevice()
    .then(token => jodel[`${upOrDown}vote`](token, req.params.id))
    .then(result => (makeNewTorIdentity(), result))
    .then(result => res.send(result))
    .catch(err => res.status(err.response.statusCode).send({ message: err.message }));
};

app.get('/api/posts', getToken, posts('newest'));
app.get('/api/posts/popular', getToken, posts('popular'));
app.get('/api/posts/mine', getToken, posts('mine'));
app.get('/api/posts/discussed', getToken, posts('discussed'));
app.post('/api/posts/:id/upvote', vote('up'));
app.post('/api/posts/:id/downvote', vote('down'));

app.post('/api/posts', getToken, (req, res) => {
  jodel.createPost(req.token, req.body.message).then(
    result => res.json(result),
    err => res.status(err.response.statusCode).json({ message: err.message })
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  } else {
    console.log('Server listening on %s:%s', app.get('host'), app.get('port')); // eslint-disable-line
  }
});
