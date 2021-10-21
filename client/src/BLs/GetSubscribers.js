import axios from "axios";
import HeadersConf from "./../configs/APIConfig";

const GetSubscribers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subs = await axios.get("http://localhost:8000/api/subs/" + id, HeadersConf().headers);
      resolve(subs)
    } catch (error) {
      reject(error)
    }

  });
};
export default GetSubscribers;
