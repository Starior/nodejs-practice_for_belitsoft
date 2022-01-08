const express = require('express')

const router = express.Router()
router.use('/*/:id', (req, res, next) => {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      next();
    } else {
      // nope 
      res.status(400).json("ID checker: Invalid id entry (it's not an ObjectID)")
    }
  })
  // router.use(function(req, res, next) {
  //   if (!req.route)
  //     res.send('That route not exist');
  //   next();
  // });
module.exports = router