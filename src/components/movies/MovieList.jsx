import React, { useState, useEffect } from 'react';
import data from './top5moviesList.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { orderBy } from "lodash";
import Select from 'react-select'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import MovieDetail from './MovieDetail';

function MovieList() {

    const [movieList] = useState(data)
    const { components } = movieList;
    const [itemDetail, setItemDetail] = useState();
    const dropDownList = components[0].items;
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [filteredData, setFilteredData] = useState([]);

    function handleClick(id) {
        const details = components[1].items.filter(selectedList => id === selectedList.id)[0];
        setItemDetail(details);
    }

    function filterHandleChange(event) {
        setSelectedOption(event);
        if (event.valueToOrderBy === 'releaseDate') {
           const filterData = orderBy(components[1].items, 'releaseDate');
           setFilteredData(filterData)
            setSelectedOption('');
            console.log(filteredData)
        } else if (event.valueToOrderBy === 'rank') {
           const filterData = orderBy(components[1].items, 'rank');
           setFilteredData(filterData)
            console.log(filteredData)
            setSelectedOption('');
        }
    }

    return (
        <><MDBContainer className="mt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Select
                        placeholder="Select Option"
                        value={selectedOption}
                        options={dropDownList}
                        onChange={filterHandleChange} />
                </div>
                <div className="col-md-4"></div>
            </div>
        </MDBContainer><MDBContainer className="mt-5">
                <div className='header'>Movies List</div>
                <MDBRow>
                    {filteredData.map((item) => <MDBCol key={item.id} lg="2" md="6" className="mb-4">
                        <div className="image"><img src={item.imageUrl} onClick={() => handleClick(item.id)} className="img-fluid z-depth-1" alt="" /></div>
                        <h3 className='title'>{item.title}</h3>
                    </MDBCol>
                    )}
                </MDBRow>
                {itemDetail && <div>
                    <MovieDetail details={itemDetail} />
                </div>}
            </MDBContainer></>
    )
}

export default MovieList