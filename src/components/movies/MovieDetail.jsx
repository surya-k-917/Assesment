import React from 'react';

function MovieDetail(props) {

    const { details } = props;

    return (
        <div className="container">
            <h2 className='header'>Watched Movie List</h2>
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Rank</th>
                                <th>Synopsis</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={details.id}>
                                <>
                                    <td>{details.type}</td>
                                    <td>{details.rank}</td>
                                    <td>{details.synopsis}</td>
                                    <td>{details.releaseDate}</td>
                                </>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail