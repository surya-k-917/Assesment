import React, { useState, useEffect } from 'react';
import data from './top5moviesList.json'
import { orderBy } from "lodash";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardTitle } from "mdbreact";
import MovieDetail from './MovieDetail';

const MovieList = () => {

    const [movieList] = useState(data)
    const { components } = movieList;
    const [itemDetail, setItemDetail] = useState();
    const dropDownList = components[0].items;
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [showFilteredMovies, setShowFilteredMovies] = useState(Boolean);
    const [showAllMovies, setAllMovies] = useState(Boolean);

    useEffect(() => {
        setAllMovies(true);
    }, [])

    function handleClick(id) {
        const details = components[1].items.filter(selectedList => id === selectedList.id)[0];
        setItemDetail(details);
    }

    function filterHandleChange(event) {
        setSelectedOption(event);
        if (event.valueToOrderBy === 'releaseDate') {
            const filterData = orderBy(components[1].items, 'releaseDate');
            setFilteredData(filterData);
            setShowFilteredMovies(true);
            setItemDetail('');
            setAllMovies(false);
        } else if (event.valueToOrderBy === 'rank') {
            const filterData = orderBy(components[1].items, 'rank');
            setFilteredData(filterData);
            setShowFilteredMovies(true);
            setAllMovies(false);
            setItemDetail('');
        }
    }

    const colourStyles = {
        menuList: styles => ({
            ...styles,
            background: 'papayawhip'
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            background: isFocused
                ? 'orange'
                : isSelected
                    ? 'pink'
                    : undefined,
            zIndex: 1
        }),
        menu: base => ({
            ...base,
            zIndex: 100
        })
    }

    return (
        <><MDBContainer className="mt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <Select
                        placeholder="Select Option"
                        value={dropDownList.find(obj => obj.valueToOrderBy === selectedOption)}
                        options={dropDownList}
                        styles={colourStyles}
                        onChange={filterHandleChange}
                    />
                </div>
                <div className="col-md-4"></div>
            </div>
        </MDBContainer>
            {showAllMovies ? <MDBContainer className="mt-5">
                <div className='header'>Movies List</div>
                <MDBRow>
                    {components[1].items.map((item) => <MDBCol key={item.id} lg="2" md="4" className="mb-4">
                        <MDBCard>
                            <div className="image"><img src={item.imageUrl} className="img-fluid z-depth-1" alt="" /></div>
                            <MDBCardTitle className='title'>{item.title}</MDBCardTitle>
                        </MDBCard>
                    </MDBCol>
                    )}
                </MDBRow>
            </MDBContainer> : null}
            {showFilteredMovies ? <MDBContainer className="mt-5">
                <div className='header'>Filtered Movies List</div>
                <MDBRow>
                    {filteredData.map((item) => <MDBCol key={item.id} lg="2" md="4" className="mb-4">
                        <MDBCard>
                            <div className="image"><img src={item.imageUrl} onClick={() => handleClick(item.id)} className="img-fluid z-depth-1" alt="" /></div>
                            <MDBCardTitle className='title'>{item.title}</MDBCardTitle>
                        </MDBCard>
                    </MDBCol>
                    )}
                </MDBRow>
                {itemDetail && <div>
                    <MovieDetail details={itemDetail} />
                </div>}
            </MDBContainer> : null}</>
    )
}

export default MovieList