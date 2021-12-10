const http = require('http');
const fs = require('fs');
const notFound = '<html><head><meta http-equiv = "Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width ,initial-scale=1,maximum-scale=1.0"> <title> nodejs - practice hw1 </title> <style> *, html {margin: 0; padding: 0; border: 0;} html {width: 100 %; height: 100 %;} body {width: 100 % ;height: 100 %; position: relative; background-color: rgb(190, 39, 140);} .center {width: 100%; height: 50%; margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-family: "Trebuchet MS", Helvetica, sans-serif; text-align: center;} h1 {font-size: 144px;} p {font-size: 64px;} </style> </head><body><div class = "center"><h1> 404 </h1><p>Page not found</p> <p> And this is served not from a file</p> </div></body> </html>';

const server = http.createServer(function(req, res) {
  // res.setHeader('Content-Type', 'application/json');
  // test
  // res.write(`{ 'key': 'value', 'key1': 'value1' }`);
  // console.log(req.url);
  // if (req.method == 'POST' && req.url === '/post') {
  //   res.write('This is POST response');
  // }
  if (req.method == 'GET') {
    switch (req.url) {
      case '/json':
        res.setHeader('Content-Type', 'application/json');
        const jsonText = fs.readFileSync('./package.json');
        res.write(jsonText);
        res.write('\n' + JSON.stringify(JSON.parse(jsonText.toString())));
        break
      case '/index':
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const index = fs.readFileSync('./index.html');
        res.write(index);
        break
      case '/about':
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const about = fs.readFileSync('./about.html');
        res.write(about);
        break
      case '/services':
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const services = fs.readFileSync('./services.html');
        res.write(services);
        break
      default:
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(notFound);
    }
  }
  if (req.method == 'POST') {
    if (req.url == '/post') {
      res.write('This is POST response');
      res.end();
    } else
      res.end('This is wrong request');
  }
  if (req.method == 'PUT') {
    if (req.url == '/put') {
      res.write('This is PUT response');
      res.end();
    } else
      res.end('This is wrong request');
  }
  if (req.method == 'DELETE') {
    if (req.url == '/delete') {
      res.write('This is DELETE response');
      res.end();
    } else
      res.end('This is wrong request');
  }
  if (req.method == 'PATCH') {
    if (req.url == '/patch') {
      res.write('This is PATCH response');
      res.end();
    } else
      res.end('This is wrong request');
  }



  return res.end();
});

server.listen(3000, () => {
  console.log('It is running');
})