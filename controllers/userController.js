//bring userModels first
const userModel = require('../models/userModel');
const { getPostData } = require('../utils');

//Gets all users (Route: /api/users)
getUsers = (req, res) => {
  //extract users from userModel
  const users = userModel.findAll();
  res.writeHead(200, { 'content-type': 'application/json' });
  res.write(JSON.stringify(users)); //require gives users as js object, therefore we need to convert it into json
  res.end();
};

//Gets a particular user (Route: /api/users/id)
getById = async (req, res, id) => {
  try {
    //extract that user from userModel
    const user = await userModel.findById(id);
    //if user exists return details
    if (user) {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(JSON.stringify(user)); //require gives users as js object, therefore we need to convert it into json
      res.end();
    } else {
      res.writeHead(400, { 'content-type': 'text/html' });
      res.write('<h1>400 User Not Found</h1>');
      res.end();
    }
  } catch (error) {
    console.log('failed async/await in getById' + error);
  }
};

//POST req for a new user (Route: /api/users)
createNewUser = async (req, res) => {
  try {
    //refer to: https://nodejs.dev/learn/get-http-request-body-data-using-nodejs

    //getPostData se resolved data idhr data variable mei store karaya
    let data = await getPostData(req);
    let userData = JSON.parse(data);

    //us data se phir create func call kia model mei
    const newUser = await userModel.create(userData);

    //finally jo user create hoke aaya use display kara dia
    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(newUser)); //require gives users as js object, therefore we need to convert it into json
    res.end();
  } catch (error) {
    console.log('error in createNewUser' + error);
  }
};

//PUT req for updating an existing user (Route: /api/users/id)
updateUser = async (req, res, id) => {
  try {
    //extract that user from userModel
    const user = await userModel.findById(id);
    //if user exists return details
    if (user) {
      //getPostData se resolved data idhr data variable mei store karaya
      let data = await getPostData(req);
      let updatedData = JSON.parse(data);

      //us data se phir create func call kia model mei
      const updateUser = await userModel.update(id, updatedData);
      //finally jo user create hoke aaya use display kara dia
      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(JSON.stringify(updateUser)); //require gives users as js object, therefore we need to convert it into json
      res.end();
    } else {
      res.writeHead(400, { 'content-type': 'text/html' });
      res.write('<h1>400 User Not Found</h1>');
      res.end();
    }
  } catch (error) {
    console.log('error in updateUser' + error);
  }
};

//DEL req for deleting an existing user (Route: /api/users/id)
deleteUser = async (req, res, id) => {
  try {
    //extract that user from userModel
    const user = await userModel.findById(id);
    //if user exists return details
    if (user) {
      //controller se details deletedUser mei store karai
      const deletedUser = await userModel.remove(id);

      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(JSON.stringify(deletedUser));
      res.end();
    } else {
      res.writeHead(400, { 'content-type': 'text/html' });
      res.write('<h1>400 User Not Found</h1>');
      res.end();
    }
  } catch (error) {
    console.log('failed async/await in deleteUser' + error);
  }
};

module.exports = { getUsers, getById, createNewUser, updateUser, deleteUser };
