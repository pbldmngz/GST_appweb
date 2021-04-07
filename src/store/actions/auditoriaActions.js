import { firebase } from "react-redux-firebase";

export const createAuditoria = (auditoria) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        firestore.collection("auditorias").add({
            ...auditoria,
            createdBy: profile.firstName + " " + profile.LastName,
            createdAt: new Date()
            //FechaInicio y FechaFin
            //Trataré de hacerlo con un componente
            //de calendario
        }).then(() => {
            dispatch({ type: "CREATE_AUDITORIA" }, auditoria)
        }).catch((err) => {
            dispatch({type: "CREATE_AUDITORIA_ERROR"}, err)
        })

    }
}
