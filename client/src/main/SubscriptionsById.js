import { useEffect } from "react";
import GetSubscribers from "../BLs/GetSubscribers";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Col, Container, Row, Alert, Card } from "react-bootstrap";
import Subscriptions from "./Subscriptions";
import DelMembers from '../BLs/DeleteMembers'
import SubscriptionsWatched from "./SubscriptionsWatched";
import AddMember from "./AddMember";
import Member from './Member'

const SubscriptionsId = (props) => {
  const storeData = useSelector((state) => state);
  const [movies, setMovies] = useState([]);
  const [members, setMembers] = useState([])
  const dispatch = useDispatch()
  const [allMembers, setAllMemebrs] = useState(true)
  const [addMember, setAddMember] = useState(false)

  const findMember = (id) => {
    return storeData.members.find(x => x._id === id)
  }

  useEffect(() => {
    setMembers(storeData.members)
  }, [storeData.members.length, storeData.subs.length])

  const handleAll = () => { 
    setAllMemebrs(true)
    setAddMember(false)

  }
  const handleAdd = () => { 
    setAllMemebrs(false)
    setAddMember(true)
  }
  return (
    <div>
 <Container >
        <h3>Subscriptions</h3>
        <Row style={{ width: "20rem" }}>
          <Col>
            <input type="button" value="All Members" onClick={() => handleAll()} />
          </Col>
          <Col>
            {storeData.permissions.createSuns && <input type="button" value="Add Member" onClick={() => handleAdd()} />}
          </Col>
        </Row>
        <br/>
        {allMembers && members.map((x, index) => {
          return (
            <div key={index}>
              <br />
              <Card style={{ width: "30rem" }}>
                  <Member user={x} all={true}/>
                <br />
                <SubscriptionsWatched movieId={x.movieId} watched={x.watched} currentMember={x._id} />
                <br />
              </Card>
            </div>
          );
        })}
      </Container>
      {addMember && <AddMember cancel={() => handleAll()} editMember={{title : "Add Member", btn : "Add Member"}}/>}
    </div>
  );
};

export default SubscriptionsId;
