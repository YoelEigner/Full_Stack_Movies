import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import GetMovies from "../BLs/GetMovies";
import Movie from "./movie";
import NewMovie from "./NewMovie";

const Movies = () => {
  const storeData = useSelector((state) => state);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState(false);
  const [msg, setMsg] = useState();
  const [alertvisible, setAlertvisible] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    window.setTimeout(() => {
      setAlertvisible(true);
    }, 8000);
  }, [msg, alertvisible]);

  const addMovie = (data) => {
    setMsg("Movie Created!");
    setAlertvisible(false);
    movies.push(data);
    dispatch({ type: "MOVIES", payload: movies });
  };
  const delMovie = (id) => {
    let movieIndex = movies.findIndex((x) => x._id === id);
    movies.splice(movieIndex, 1);
    setMovies([...movies]);
  };

  useEffect(() => {
    if (storeData.movies.length <= 0) {
      GetMovies().then((data) => {
        setMovies(storeData.movies);
        // setMovies(data.data);
      });
    } else {
      setMovies(storeData.movies);
    }
  }, [storeData.movies, storeData.movies.length]);
  const updateStore = (data) => {
    movies.push(data);
    dispatch({ type: "MOVIES", payload: movies });
  };

  return (
    <div>
      Movies
      <br />
      <br />
      <Container>
        <Row style={{ width: "20rem" }}>
          <Col>
            <input type="button" value="All Movies" onClick={() => setNewMovie(false)} />
          </Col>
          <Col>
            {storeData.permissions.createMovies && <input type="button" value="Add Movie" onClick={() => setNewMovie(true)} />}
          </Col>
        </Row>
      </Container>
      <Container>
        <Col>
          <br />
          <Alert hidden={alertvisible} variant={"success"}>
            {msg}
          </Alert>
          {!newMovie &&
            movies.map((movieCurrent, index) => {
              return (
                <div key={index}>
                  {<Movie movie={movieCurrent} delete={(data) => delMovie(data)} updateMovie={(data) => updateStore(data)} all={true}/>}
                  {/* <Row>
                    <Col></Col>
                    <Col></Col>
                  </Row> */}

                  <br />
                </div>
              );
            })}
          {newMovie && <NewMovie cancel={() => setNewMovie(false)} addedMovie={(data) => addMovie(data)} />}
          <br />
        </Col>
      </Container>
    </div>
  );
};

export default Movies;
