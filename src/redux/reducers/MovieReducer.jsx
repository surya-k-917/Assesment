const movieReducer = (state = 0, action) => {

    switch (action.type) {
        case 'ADD':
            return state + 1
        case 'REMOVE':
            if (state > 0) {
                return state - 1
            }
            break;
        default:
            return state
    }
};

export default movieReducer;