import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const authenticate = (data) => {
  return new Promise(async (resolve, reject) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const auth = await axios
      .post("http://localhost:8001/api/auth", data, axiosConfig)
      .then((status) => {
        resolve(status);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default authenticate;
