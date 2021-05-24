const initState = {}

const procesoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROCESO_SUCCESS':
            console.log('create proceso success');
            return state;
        case 'CREATE_PROCESO_ERROR':
            console.log('create proceso error');
            return state;
        default:
            return state;
    }
};

export default procesoReducer;