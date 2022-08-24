const mongooseMovieData = require("../configs/moviesSchema");
const mongooseUsersData = require("../configs/membersDBSchema");
const mongooseSubsData = require("../configs/subscriptionsSchema");

exports.getData = (db) => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getDataById = (db, id) => {
  return new Promise((resolve, reject) => {
    db.find({movieId : id}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.saveData = (db, obj) => {
  return new Promise((resolve, reject) => {
    db.create(obj, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};

exports.updateData = (db, id, obj) => {
  return new Promise((resolve, reject) => {
    db.findByIdAndUpdate(id, obj, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};
exports.delData = (db, id) => {
  return new Promise((resolve, reject) => {
    db.findByIdAndDelete(id, (err, data) => {
      if (err) {
        reject(err);
      } else resolve(data);
    });
  });
};
