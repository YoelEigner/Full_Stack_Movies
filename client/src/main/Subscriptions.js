import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {  Container, ListGroupItem, Card } from "react-bootstrap";

const Subscriptions = (props) => {
  const storeData = useSelector((state) => state);
  const [subs, setSubs] = useState(props.subs);
  const [members, setMembers] = useState([])
  // const [members, setMembers] = useState(storeData.members);
  const findName = (id) => {
    let tempMembers = storeData.subs.filter((x) => x.movies.movieId === props.movieId)
    let tempMember = tempMembers.map(tempMember => {
      let temp = storeData.members.find((x) => x._id === tempMember.memberId)
      return temp
    })
    return tempMember
  };

  useEffect(() => {
    setSubs(props.subs)
    setMembers(storeData.subs.filter((x) => x.movies.movieId === props.movieId));

  }, [props.movieId, props.subs, storeData.subs, storeData.subs.length]);

  return (
    <div>
      <Card>
      {findName().map((x, index) => {
        return (
          <Container key={index}>
            <br />
            <ListGroupItem><a href={"/protected/user/" + x._id + "/"}>{x.name}</a></ListGroupItem>
            <ListGroupItem>{x.date}</ListGroupItem>
            <br />
          </Container>
        );
      })}
    </Card>
    </div>
  );
};

export default Subscriptions;
