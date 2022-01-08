const express = require('express');
const { engine } = require('express-handlebars');
const { connect } = require('./utils/database')

const postsRoute = require('./routes/posts')
const allRoutes = require('./routes/all')
const categoriesRoutes = require('./routes/categories')
const tagsRoutes = require('./routes/tags')

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(allRoutes)
app.use(postsRoute)
app.use(categoriesRoutes)
app.use(tagsRoutes)

app.use(function(req, res, next) {
  if (!req.route)
    res.render('404', {});
  // next();
});

connect((error) => {
  if (error) {
    console.log(error)
    return
  }
  console.log('It is connected')
  app.listen(3000, () => {
    console.log('It is running')
  })
})

// app.listen(3000, () => {
//   console.log('It is running')
// })