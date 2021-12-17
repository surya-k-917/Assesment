import React, { useState } from 'react';
import data from './top5moviesList.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import MovieDetail from './MovieDetail';

function MovieList() {

    const [movieList] = useState(data)
    const { components } = movieList;
    const [itemDetail, setItemDetail] = useState();

    function handleClick(id) {
        const details = components[1].items.filter(selectedList => id === selectedList.id)[0];
        setItemDetail(details);
    }

    return (
        <MDBContainer className="mt-5">
            <div className='header'>Movies List</div>
            <MDBRow>
                {
                    components[1].items.map((item) =>
                        <MDBCol lg="2" md="6" className="mb-4">
                            <div className="image"><img key={item.id} src={item.imageUrl} onClick={() => handleClick(item.id)} className="img-fluid z-depth-1" alt="" /></div>
                            <h3 className='title'>{item.title}</h3>
                        </MDBCol>
                    )
                }
            </MDBRow>
            {itemDetail && <div>
                <MovieDetail details={itemDetail} />
            </div>}
        </MDBContainer>
    )
}

export default MovieList