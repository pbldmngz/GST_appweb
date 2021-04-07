const initState = {}

const areaReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_AREA_SUCCESS':
            console.log('create area success');
            return state;
        case 'CREATE_AREA_ERROR':
            console.log('create area error');
            return state;
        default:
            return state;
    }
};

export default areaReducer;