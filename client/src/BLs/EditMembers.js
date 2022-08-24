import axios from "axios"
import HeadersConf from "./../configs/APIConfig";

const EditMember = async (id, obj) => {
    let resp = await axios.put('http://localhost:8000/api/members/update/members/' + id, obj, HeadersConf().headers)
    return resp.data
}
export default EditMember