const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const { connect } = require('./utils/database')

const allRoutes = require('./routes/all')
const postsRoutes = require('./routes/posts')
const categoriesRoutes = require('./routes/categories')
const authorsRoutes = require('./routes/authors')
const tagsRoutes = require('./routes/tags')

const logger = require('./middlewares/logger')

const app = express()

app.use(bodyParser.json())

app.use(logger.writeLog)

app.use(allRoutes) // check id entry

app.use(postsRoutes)
app.use(categoriesRoutes)
app.use(authorsRoutes)
app.use(tagsRoutes)

app.get('/', (req, res) => {
  res.status(200).send('Homepage')
})

app.get('/logs', (req, res) => {
  fs.readFile('./logs.json', function(error, data) {
    if (error) throw error;
    res.status(200).send(data); //JSON

  });
})

app.use(function(req, res, next) {
  if (!req.route)
    res.status(404).send('That route not exist');
  // next();
});

connect((error) => {
  if (error) {
    console.log(error)
  }
  app.listen(3000, () => {
    console.log('It is running')
  })
})