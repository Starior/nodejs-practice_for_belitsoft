const mongoose = require('mongoose')
const url = 'mongodb+srv://Starion:12345qwert@cluster0.pxpmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connect = (callback) => {
  mongoose.connect(url, (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('It is connected')
    callback();
  })
}

exports.connect = connect