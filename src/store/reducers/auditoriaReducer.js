const initState = {}

const auditoriaReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_AUDITORIA_SUCCESS':
            console.log('create auditoria success', action.auditoria);
            return state;
        case 'CREATE_AUDITORIA_ERROR':
            console.log('create auditoria error', action.err);
            return state;
        case 'SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA':
            return state;
        case 'SUCCESSFULLY_EXTRACTED_RESPUESTAS_PREGUNTAS_FROM_AUDITORIA':
            return state;
        case 'FAILED_EXTRACT_PREGUNTAS_FROM_AUDITORIA':
            console.log('create pregunta error', action.err);
            return state;
        default:
            return state;
    }
};

export default auditoriaReducer;