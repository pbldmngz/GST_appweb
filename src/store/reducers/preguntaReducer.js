const initState = {

}

const preguntaReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PREGUNTA_SUCCESS':
            console.log('create pregunta success', action.pregunta);
            return state;
        case 'CREATE_PREGUNTA_ERROR':
            console.log('create pregunta error', action.err);
            return state;
        case 'CREATE_RESPUESTA_PREGUNTA':
            return state;
        case 'CREATE_RESPUESTA_PREGUNTA_ERROR':
            console.log('create respuesta pregunta error', action.err);
            return state;
        default:
            return state;
    }
};

export default preguntaReducer;