const axios = require('axios');

axios
  .delete('http://localhost:3000/api/users/1')
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
