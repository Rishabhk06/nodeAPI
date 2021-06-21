const axios = require('axios');

axios
  .put('http://localhost:3000/api/users/1', {
    id: 99,
    name: 'updated name',
    age: 22,
    username: 'update done successfully',
  })
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
