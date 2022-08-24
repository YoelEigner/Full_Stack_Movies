import { Col, Container,Form, Row } from "react-bootstrap";
import CreateMember from './../BLs/CreateMember';
import EditMembers from './../BLs/EditMembers';
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'

const AddMember = (props) => {
  const dispatch = useDispatch()
  const storeData = useSelector(state => state)
  const [user, setUser] = useState({ _id :"", name : "", email : "", address : {street : "", suite : "", city : "", zipcode : ""}})
  useEffect(() => {
    if(props.editMember.btn === "Update"){
    setUser(props.user)
    }
  }, [])

    const handleAdd = async (e) => {
        e.preventDefault()
        const {name, email, street, suite, city, zip} = e.target.elements
        let obj = {
            // _id : user._id,
            "name" : name.value,
            "email" : email.value,
            "address" : {
                "street" : street.value,
                "suite" : suite.value,
                "city" : city.value,
                "zipcode" : zip.value
            }
        }        
        let temp;
        if(props.editMember.btn === "Update"){
          obj._id = user._id
          let resp = await EditMembers(props.user._id, obj)
          let members = storeData.members
          let index = members.findIndex(x => x._id === user._id)
          members[index] = obj
          temp = members    
          dispatch({ type : "MEMBERS", payload : temp });
      
        }
        else if(props.editMember.btn === "Add Member"){
          let resp = await CreateMember(obj)
          temp = storeData.members
          temp.push(obj)
          dispatch({ type : "MEMBERS", payload : temp });


        }

            console.log(storeData.subs)

        props.cancel()
   
      }
    return(<div>
        <Container>
        <Row lg={2}>
            <br/>
            <Form onSubmit={(e) => handleAdd(e)}>
            <h3>{props.editMember.title}</h3><br/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Full Name" defaultValue={user.name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="abc@gmail.com"  defaultValue={user.email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Street</Form.Label>
              <Form.Control name="street" type="text" placeholder="Street" defaultValue={user.address.street}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Suite</Form.Label>
              <Form.Control name="suite" type="text" placeholder="suite" defaultValue={user.address.suite}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control name="city" type="text" placeholder="city" defaultValue={user.address.city} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control name="zip" type="text" placeholder="Zipcode" defaultValue={user.address.zipcode}/>
            </Form.Group>
              <Container>
                <Row >
                  <Col>
                    <input type="submit" value={props.editMember.btn} /> 
                  </Col>
                  <Col>
                      <input type="button" value="Cancel" onClick={() => props.cancel()}/> 
                  </Col>
                </Row>
            </Container>
            </Form>
        </Row>
        </Container>
        
    </div>)
}
export default AddMember