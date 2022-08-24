import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import {  Container, Card } from "react-bootstrap";
import NewSubscription from "./NewSubscriptions";

const SubscriptionsWatched = (props) => {
    const storeData = useSelector((state) => state);
    const [movies, setMovies] = useState([]);
    const [newSub, setNewSub] = useState(false)


    const findMovie = (id) =>{
        return storeData.movies.find(x => x._id === id)
      }
    useEffect(() => {
        let finalMovies = []
        let subs = storeData.subs.filter(x => x.memberId === props.currentMember)
        subs.forEach(x => {
            let movie = findMovie(x.movies.movieId)
            finalMovies.push(movie)
            // console.log(movie)

        })
        setMovies(finalMovies)
        // console.log(subs)

    },[storeData.subs.length])
    return (
        <div>
            <Container >
                <Card >
                    <h3>Movies Watched</h3>
                    <Container>
                        <input onClick={() => setNewSub(!newSub)} style={{ width: "15rem" }} type="button" value="Subscribe to a new movie" />
                        <br />
                        {newSub && <NewSubscription currentMember={props.currentMember} movies={movies}/>}
                        <br />
                        {movies.map((movie, index) => {
                            return (<div key={index}>
                                <a href={"/protected/movie/" + movie._id}>{movie.name}</a><br />
                                {props.watched}
                            </div>)
                        }
                        )}
                    </Container>
                </Card>
            </Container>
        </div>
    );
};

export default SubscriptionsWatched;