import axios from "axios";
import HeadersConf from "./../configs/APIConfig";

const UpdateUsers = (id, permissions, user, userDB) => {
  return new Promise((resolve, reject) => {
    axios
      .put("http://localhost:8001/api/users/db/update/" + id, userDB, HeadersConf().headers)
      .then((data) => {
        axios
          .put("http://localhost:8001/api/users/update/permissions/" + id, permissions, HeadersConf().headers)
          .then((data) => {
            axios
              .put("http://localhost:8001/api/users/update/user/" + id, user, HeadersConf().headers)
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default UpdateUsers;
