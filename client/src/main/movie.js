import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Container, Col, Row, Form, Alert } from "react-bootstrap";
import EditMovies from "../BLs/EditMovies";
import DeleteMovies from "../BLs/DeleteMovies";
import Subscriptions from "./Subscriptions";
import { useSelector } from 'react-redux';

const Movie = (props) => {
    const storeData = useSelector(state => state)

  const [movie, setMovie] = useState({name : "", image : ""});
  const [edit, setEdit] = useState(true);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [msg, setMgs] = useState("");
  const [alertvisible, setAlertvisible] = useState(true);
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    if(props.all){
    let sub = storeData.subs.filter(x => x.movies.movieId === props.movie._id)
    sub.forEach(members => {
      let member = storeData.members.filter(x => x._id === members.memberId)
      member[0].date = members.movies.date
      setSubscribers(member)
    }
    )
    setMovie(props.movie)
    }
  }, [props.movie])

    useEffect(() => {
      if(props.match !== undefined){
     let movieTemp = storeData.movies.find(x => x._id === props.match.params.id)
      console.log(movieTemp)
      setMovie(movieTemp)
      }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, genres, premiered } = e.target.elements;
    let tempGenres = genres.value.split(",");
    let tempMovies = { name: name.value, genres: tempGenres, premiered: premiered.value };
    EditMovies(tempMovies, movie._id)
      .then((data) => {
        props.updateMovie(data.data);
        setMgs("Movie Updated!");
        setAlertvisible(false);
        setHiddenBtn(!hiddenBtn);
        setEdit(!edit);
      })
      .catch((err) => {
        setMgs(err);
        setAlertvisible(false);
      });
  };
  const handleDelete = () => {
    DeleteMovies(movie._id).then((data) => {
      props.delete(movie._id);
    });
  };
  const handleEdit = () => {
    setHiddenBtn(!hiddenBtn);
    setEdit(!edit);
  };
  const handleCancel = () => {
    setHiddenBtn(!hiddenBtn);
    setEdit(!edit);
  };

  useEffect(() => {
    window.setTimeout(() => {
      setAlertvisible(true);
    }, 8000);
  }, [alertvisible]);

  return (
    <div>
      <br />
      <br />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Container>
          <Card>
            {
              <div key={movie._id}>
                <Row>
                  <Col>
                    Name : <input name="name" disabled={edit} defaultValue={movie.name} />
                    <br />
                    Genres : <input name="genres" disabled={edit} defaultValue={movie.genres} />
                    <br />
                    Premiered : <input name="premiered" disabled={true} defaultValue={movie.premiered} />
                    <br />
                    <img src={movie.image.medium} name="image" />
                    <br />
                    <br />
                    <Row style={{ width: "20rem" }}>
                      <Col >
                        <input type="button" value="Edit" hidden={!hiddenBtn} onClick={() => handleEdit()} />
                      </Col>
                      <Col>
                        {storeData.permissions.delMovies && <input type="button" value="Delete" hidden={!hiddenBtn} onClick={() => handleDelete()} />}
                      </Col>
                    </Row>
                    <Row style={{ width: "20rem" }}>
                      <Col>
                        <input type="button" hidden={hiddenBtn} value="Cancel" onClick={() => handleCancel()} />
                      </Col>
                      <Col>                      
                        <input type="submit" hidden={hiddenBtn} value="Update" />
                      </Col>
                    </Row>
                    <br />
                    <Alert hidden={alertvisible} variant={"success"}>
                      {msg}
                    </Alert>
                  </Col>
                  <Col><br /><h3>Subscriptions</h3>{<Subscriptions subs={subscribers} movieId={movie._id} />}</Col>
                </Row>
              </div>
            }
          </Card>
        </Container>
      </Form>
    </div>
  );
};
export default Movie;
