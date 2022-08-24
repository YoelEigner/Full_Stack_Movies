import axios from 'axios'
import HeadersConf from './../configs/APIConfig';


const CreateMember = async (obj) => {
    console.log(obj)
    let resp = await axios.post('http://localhost:8000/api/members/create/members', obj, HeadersConf().headers)
    return resp.data
}
export default CreateMember