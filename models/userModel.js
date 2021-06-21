//extract data in userModel
const users = require('../users.json');
const { writeDataToFile } = require('../utils');
findAll = () => {
  return users;
};

findById = (id) => {
  let user = users.find((u) => u.id === id);

  //if we simply return user; it shows undefined in the controller; therefore we need promise
  return new Promise((res, rej) => {
    res(user);
  });
};

create = (userData) => {
  return new Promise((res, rej) => {
    //push user into the array
    res(users.push(userData));

    //make changes in the users.json file
    writeDataToFile('users.json', users);
  });
};

update = (id, updatedData) => {
  return new Promise((res, rej) => {
    //find that user by id
    const index = users.findIndex((p) => p.id === id);

    //replace new user data into the array
    users[index] = updatedData;
    res(users[index]);

    //make changes in the users.json file
    writeDataToFile('users.json', users);
  });
};

remove = (id) => {
  return new Promise((res, rej) => {
    //find index of that user in the users.json array
    const index = users.findIndex((u) => u.id == id);

    //remove that user from array
    res(users.splice(index, 1));

    //update file content
    writeDataToFile('users.json', users);
  });
};

module.exports = { findAll, findById, create, update, remove };
