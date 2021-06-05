export const createPregunta = (pregunta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("preguntas").add({
            ...pregunta,
            createdBy: profile.firstName + " " + profile.lastName,
            authorId,
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
            re.answeredById = authorId;
            re.answeredAt = new Date();

            return re
        })

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

export const deletePregunta = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        firestore.collection("preguntas").doc(id).delete()
    }
}

export const editPregunta = (id, pregunta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("preguntas").doc(id).update({
            ...pregunta,
            updatedAt: new Date(),
            updatedBy: profile.firstName + " " + profile.lastName,
            editorId: authorId
        }).then(() => {
            dispatch({ type: "EDIT_PREGUNTA" }, pregunta)
        }).catch((err) => {
            dispatch({ type: "EDIT_PREGUNTA_ERROR" }, err)
        })

    }
}

export const getPregunta = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        var docRef = firestore.collection("preguntas").doc(id);

        return docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });

    }
}