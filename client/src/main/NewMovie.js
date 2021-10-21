import { Col, Card, Container, Row, Form } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import AddMovie from '../BLs/CreateMovie';

const NewMovie = (props) => {
  const storeData = useSelector((state) => state);
  const [genres] = useState(storeData.genres);
  const [selected, setSelected] = useState([])
  const handleCancel = () => {
    props.cancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const {name, premiered, url} = e.target.elements
    const data = {name : name.value, genres : selected, premiered :premiered.value, image :{medium : url.value, original : url.value} }
    AddMovie(data).then((data) => {
      props.addedMovie(data.data)
      props.cancel(false)
    }).catch((err) => {console.log(err)})
  };
  return (
    <div>
      <br />

      <h3>New Movie</h3>
      <div>
        <Card style={{ width: "20rem" }}>
          <Container>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Movie Name" />
              </Form.Group>
              Genres : <DropdownMultiselect options={genres} name="genres" handleOnChange={(selected) => setSelected(selected)} />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Premiered</Form.Label>
                <Form.Control name="premiered" type="date" placeholder="Premiered" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="url" type="text" placeholder="www.website.com/img.jpg" />
              </Form.Group>
              <br />
              <br />
              <Row>
                <Col>
                  <input type="button" value="Cancel" onClick={() => handleCancel()} />
                </Col>
                <Col>
                  <input type="submit" value="Add Movie" />
                </Col>
              </Row>
            </Form>
            <br />
          </Container>
        </Card>
        {/* <Alert hidden={alertvisible} variant={"success"}>
                  {msg}
                </Alert> */}
      </div>
    </div>
  );
};
export default NewMovie;
