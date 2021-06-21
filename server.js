const http = require('http');
const {
  getUsers,
  getById,
  createNewUser,
  updateUser,
  deleteUser,
} = require('./controllers/userController');

http
  .createServer((req, res) => {
    //Get all users from API
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    }
    //Get a particular user from API
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
      //extracting id from the whole url
      const id = parseInt(req.url.split('/')[3]); //split returns a string; parseInt converts to no
      getById(req, res, id);
    }
    //Create a new user(Post req)
    else if (req.url === '/api/users' && req.method === 'POST') {
      createNewUser(req, res);
    }
    //Update existing user(PUT req)
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
      const id = parseInt(req.url.split('/')[3]); //split returns a string; parseInt converts to no
      updateUser(req, res, id);
    } else if (
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === 'DELETE'
    ) {
      const id = parseInt(req.url.split('/')[3]); //split returns a string; parseInt converts to no
      deleteUser(req, res, id);
    } else {
      res.writeHead(404, { 'content-type': 'text/html' });
      res.write('<h1>404 Not Found</h1>');
      res.end();
    }
  })
  .listen(3000, () => {
    console.log('server running on port 3000');
  });
