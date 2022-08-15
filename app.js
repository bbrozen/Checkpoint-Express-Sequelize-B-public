const express = require('express');
const app = express();
const todoRouter = require('./routes/index');
module.exports = app; // this line is only used to make testing easier.

// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use('/',todoRouter);


if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
