const fs = require('fs');

const writeLog = (req, res, next) => {
  const obj = {
    route: req.url,
    method: req.method,
    params: req.params,
    body: req.body,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString('en-US', { hour12: false })
  };
  var json = JSON.stringify(obj, null, 2);
  // var json = JSON.stringify(obj);



  if (checkFileExistsSync('./logs.json')) {
    // console.log('file exists');
    const rawdata = fs.readFileSync('./logs.json');
    if (validateJSON(rawdata)) {
      // console.log('file json');
      const myJSON = JSON.parse(rawdata);
      let myJSONString = JSON.stringify(myJSON, null, 2);
      if (myJSONString.slice(myJSONString.length - 1) === "]") {
        // 3 & subsequent logs
        myJSONString = myJSONString.slice(1, myJSONString.length - 1)
        fs.writeFileSync('./logs.json', "[" + myJSONString + ",\n" + json + "\n]"); // 
      } else {
        // 1 & 2 logs
        fs.writeFileSync('./logs.json', "[" + rawdata + ",\n" + json + "]");
      }
    } else {
      // console.log('file emty (not json)');
      fs.writeFileSync('./logs.json', json);
    }
  } else {
    // console.log('file does not exists');
    fs.writeFileSync('./logs.json', json);
  }

  //old
  // fs.appendFile('./logs.json', json + "\n", () => {
  //   console.log('logs.json was updated');
  // })

  next();
}

function checkFileExistsSync(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    // if came to here, then valid
    return data;
  } catch (e) {
    // failed to parse
    return false;
  }
}

module.exports = { writeLog }