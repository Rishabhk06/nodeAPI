const axios = require('axios');

axios
  .post('http://localhost:3000/api/users', {
    id: 99,
    name: 'aditya',
    age: 11,
  })
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
