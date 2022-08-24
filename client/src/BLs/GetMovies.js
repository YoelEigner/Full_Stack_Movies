
import axios from "axios";
import HeadersConf from './../configs/APIConfig';

const GetMovies = async ()=> {
  let resp = await axios.get("http://localhost:8000/api/movies", HeadersConf().headers)
  return resp
};
export default GetMovies;
