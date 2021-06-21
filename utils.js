const fs = require('fs');
const { resolve } = require('path');

writeDataToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    console.log('error in writing file' + err);
  });
};

getPostData = (req) => {
  return new Promise((res, rej) => {
    //yaha pe body data extract kr lia POST req mei se aur sirf data bheja controller mei
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      res(data);
    });
  });
};

module.exports = { writeDataToFile, getPostData };
