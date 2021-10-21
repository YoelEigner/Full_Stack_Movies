import {  Container, Card, DropdownButton } from "react-bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import CreateSub from "../BLs/CreateSubs";

const NewSubscription = (props) => {
    const [date, setDate] = useState()
    const [title, setTitle] = useState("")
    const storeData = useSelector(state => state)
    const [movieNames, setMovieNames] = useState([])
    const dispatch = useDispatch()

    const handleSubscribe = async () => {
        let selectedMovie = findMovie(title)
        let obj = {
            memberId : props.currentMember,
            movies : {
                movieId : selectedMovie._id,
                date : date
            }
        }
        await CreateSub(obj)
        let temp = storeData.subs
        temp.push(obj)
        dispatch({type : "SUBS", payload : temp})
    }
    const findMovie = (name) =>{
        return storeData.movies.find(x => x.name === name)
      }

    useEffect(() => {
        let subscribed = props.movies.map(x => x.name)
        let movies = storeData.movies.map(x => x.name)
        let filtered = movies.filter((exists) => {
            return !subscribed.includes(exists)
        })
        setMovieNames(filtered)
        setTitle(filtered[0])
    }, [props.movies, storeData.movies])

    return (<div>
        <br />
        <Container>
            <Card style={{ width: "20rem" }}>
                <Container style={{ width: "20rem" }}>
                    <h3>New subscription</h3>
                    <DropdownButton variant="Secondary" name="movienames" title={title}>
                        <div style={{ maxHeight: "300px", overflow: "auto" }}>
                            {movieNames.map((x,index) =>
                                <DropdownItem key={index} onClick={() => setTitle(x)}>
                                    {x}
                                </DropdownItem>
                            )}
                        </div>
                    </DropdownButton >

                    <br />
                    <input type="date" onChange={(e) => { setDate(e.target.value) }} />
                    <input type="button" value="Subscribe" onClick={() => handleSubscribe()} />
                </Container>
            </Card>
        </Container>
    </div>)
}
export default NewSubscription