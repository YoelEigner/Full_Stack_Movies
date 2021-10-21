import axios from "axios";

const GetMembers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8000/api/members")
      .then((data) => {        
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};
export default GetMembers;
