import axios from "axios";

const DeleteUser = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete("http://localhost:8001/api/users/delete/user/" + id)
      .then(() => {
        axios
          .delete("http://localhost:8001/api/users/delete/permissions/" + id)
          .then(() => {
            axios
              .delete("http://localhost:8001/api/users/db/delete/" + id)
              .then((data) => {
                  resolve(data)
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => reject(err));
  });
};
export default DeleteUser;
