import axios from "axios"

const CreateSub = async (obj) => {
    let resp = await axios.post('http://localhost:8000/api/subs/create/subs', obj)
    return resp
}
export default CreateSub