import axios from "axios";

const Signup = (obj, userPermissions) => {
  let loginInfo = { username: obj.username, password: obj.password };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  let date = new Date();
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8001/api/users/db/create", loginInfo, axiosConfig)
      .then((id) => {
        let permissions = {
          id: id.data._id,
          permissions: userPermissions,
        };
        let userInfo = { id: id.data._id, fName: obj.fName, lName: obj.lName, created: date.toISOString(), timeOut: obj.timeOut };

        axios.post("http://localhost:8001/api/users/create/user", userInfo, axiosConfig).then(() => {
          axios.post("http://localhost:8001/api/users/create/permissions", permissions, axiosConfig).then((resp) => {
            resolve(resp);
          });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default Signup;
