import React, { useState } from 'react';
import { orderBy } from "lodash";
import data from './top5moviesList.json'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';


function MovieList() {

    const [movieList] = useState(data)
    const dispatch = useDispatch()
    const { components } = movieList;
    const count = useSelector(state => state.movie)

    return (
        <div>
            <h1>Total watched moviesList : {count}</h1>
            {
                components?.map((item) => {
                    return (
                        <div style={{ display: "flex" }}>
                            {
                                orderBy(item.items, 'releaseDate').map((Imageslist, i) =>
                                    <div>
                                        <img style={{ padding: "12px" }} key={Imageslist.id} src={Imageslist.imageUrl} height="350px" width="300px" alt="" />
                                        <h2>{i + 1}</h2>
                                        <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'ADD' })}>Adding Watched List</Button>
                                        <br />
                                        <br />
                                        <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'REMOVE' })}>Removing Watched List</Button>
                                        <h3>Movie Title: {Imageslist.title}</h3>
                                        <p>{Imageslist.synopsis}</p>
                                        <h3>Year: {Imageslist.releaseDate}</h3>
                                    </div>
                                )
                            }

                        </div>

                    )
                })
            }
        </div>
    )
}

export default MovieList
