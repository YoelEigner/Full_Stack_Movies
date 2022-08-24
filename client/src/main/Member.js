import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from "react-bootstrap";
import DelMembers from '../BLs/DeleteMembers'
import AddMember from './AddMember'
const Member = (props) => {
    const storeData = useSelector(state => state)
    const [member, setMember] = useState({name : "", address : {city : ""}})
    const [edit] = useState(true)
    const [hiddenBtn] = useState(true);
    const [showForm, setShowForm] = useState(true)

    const dispatch = useDispatch()

    const handleCancel = () => {
        setShowForm(!showForm)

        }
    const handleEdit = () => {
        setShowForm(!showForm)
        // setHiddenBtn(!hiddenBtn)
        // setEdit(!edit)
        }
        useEffect(() => {
            if(props.all){
                setMember(props.user)
            }
        }, [props.all, props.user])
        useEffect(() => {
            if(props.match !== undefined){
                let memberTemp = storeData.members.find(x => x._id === props.match.params.id)
                setMember(memberTemp)

            }
        }, [props.match, storeData.members, storeData.members.length])

    const handleDel = (id) => {
      DelMembers(id).then((data) => {
        let delSubIndex = storeData.subs.findIndex(x => x.memberId === id)
        let delMemberIndex = storeData.members.findIndex(x => x._id === id)
        let temp = storeData.subs
        let tempMember = storeData.members
        temp.splice(delSubIndex, 1)
        tempMember.splice(delMemberIndex, 1)
        dispatch({ type: "SUBS", payload: temp })
        dispatch({ type: "MEMBERS", payload: tempMember })
        alert("Deleted!")
      })
        .catch((err) => console.log(err))
    }

    return (<div>
            <Container>
                {showForm && 
                    <div>
                        <h3 hidden={!edit}>{member.name}</h3>
                            <label hidden={edit}>Name : <input name="name"  disabled={edit} defaultValue={member.name} /></label><br/>
                            Email : <input name="email" disabled={edit} defaultValue={member.email} /><br/>
                            City : <input name="city" disabled={edit} defaultValue={member.address.city} /><br/><br/>
                            <Container>
                                <Row >
                                <Col>
                                <input type="button" value={"Edit"} hidden={!hiddenBtn} onClick={() => handleEdit()} />
                                </Col>
                                <Col>
                                {storeData.permissions.delSubs && <input type="button" value={"Delete"} hidden={!hiddenBtn} onClick={() => handleDel(member.name._id)} />}
                                </Col>
                                </Row>
                            </Container>
                    </div>
                    }
                    {!showForm && <AddMember cancel={() => handleCancel()} user={member} editMember={{title : "Edit Member", btn : "Update"}} /> }
            </Container>
            {/* </NavBar> */}
    </div>)
}
export default Member