const request = require('request');

const options={
  url: 'http://localhost:8080/signup',
  method:'POST',
  json: true,
  headers: {
      "Content-Type":"application/json"
  },
  body: {name:"bzy",age:8}
}
request(options,function (error,response,body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
  } else {
      console.error(error);
  }
});