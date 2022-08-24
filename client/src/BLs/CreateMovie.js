import axios from "axios";
const AddMovie = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8000/api/movies/create/movies/", obj)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default AddMovie;
