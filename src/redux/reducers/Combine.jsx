import movieReducer from './MovieReducer'
import { combineReducers } from 'redux';



const allReducers = combineReducers(
    {
        movie: movieReducer,
    }
)
export default allReducers;