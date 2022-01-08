const express = require('express')

const router = express.Router()
router.use('/*/:id', (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    next();
  } else {
    res.render('invalidId', {});
  }
})

module.exports = router