const jFile = require("jsonfile");
const mongodb = require("../configs/userSchema");

exports.getJsonData = (file) => {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + file, (err, obj) => {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};

exports.createDataJson = async (obj, file) => {
  const data = await this.getJsonData(file);
  const temp = [...data, obj];
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + file, temp, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};

exports.updateJsonData = async (obj, id, file) => {
  let data = await this.getJsonData(file);
  let index = data.findIndex((x) => x.id == id);
  data[index] = obj;
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + file, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};

exports.deleteJsonData = async (id, file) => {
  let data = await this.getJsonData(file);
  let index = data.findIndex((x) => x.id == id);
  data.splice(index, 1);
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + file, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Success");
      }
    });
  });
};

//databse functions
exports.getData = () => {
  return new Promise((resolve, reject) => {
    mongodb.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
exports.getDataById = (id) => {
  return new Promise((resolve, reject) => {
    mongodb.find({ _id: id }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.saveData = (obj) => {
  return new Promise((resolve, reject) => {
    mongodb.create(obj, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};

exports.updateData = (id, obj) => {
  return new Promise((resolve, reject) => {
    mongodb.findByIdAndUpdate(id, obj, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};
exports.delData = (id) => {
  return new Promise((resolve, reject) => {
    mongodb.findByIdAndDelete(id, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};

/////
// exports.users = () => {
//   return new Promise((resolve, reject) => {
//     mongodb.find({}, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };
