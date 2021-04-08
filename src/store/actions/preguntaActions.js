import { firebase } from "react-redux-firebase";

export const createPregunta = (pregunta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("preguntas").add({
            ...pregunta,
            createdBy: profile.firstName + " " + profile.lastName,
            createdAt: new Date()
            //FechaInicio y FechaFin
            //Trataré de hacerlo con un componente
            //de calendario
        }).then(() => {
            dispatch({ type: "CREATE_PREGUNTA" }, pregunta)
        }).catch((err) => {
            dispatch({ type: "CREATE_PREGUNTA_ERROR" }, err)
        })

    }
}
