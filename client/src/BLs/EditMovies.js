import axios from "axios";

const UpdateMovies = (obj, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put("http://localhost:8000/api/movies/update/movies/" + id, obj)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
          reject(err)
      });
  });
};
export default UpdateMovies;
