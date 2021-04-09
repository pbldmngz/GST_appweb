import { firebase } from "react-redux-firebase";

export const createPregunta = (pregunta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("preguntas").add({
            ...pregunta,
            createdBy: profile.firstName + " " + profile.lastName,
            // createdById: profile.id, //Esta linea es modificación, no funciona
            // Pero me gustaría enlazar "profile" con su Id, sería más fácil rastrearlo
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: "CREATE_PREGUNTA" }, pregunta)
        }).catch((err) => {
            dispatch({ type: "CREATE_PREGUNTA_ERROR" }, err)
        })

    }
}

export const respuestaPregunta = (respuesta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        var respArray = respuesta.map((re) => {
            re.answeredBy = profile.firstName + " " + profile.lastName;
            // re.answeredById = profile.id,
            re.answeredAt = new Date()

            return re
        })

        // console.log("respArray: ", respArray)

        for (let res of respArray) {
            firestore.collection("respuestas").add(res)
                .then(() => {
                    dispatch({ type: "CREATE_RESPUESTA_PREGUNTA" }, respuesta)
                }).catch((err) => {
                    dispatch({ type: "CREATE_RESPUESTA_PREGUNTA_ERROR" }, err)
                })
        }
    }
}
