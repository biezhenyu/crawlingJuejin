const request = require('request');
request('https://juejin.im/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
});