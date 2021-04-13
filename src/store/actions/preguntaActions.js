import { firebase } from "react-redux-firebase";

export const createPregunta = (pregunta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("preguntas").add({
            ...pregunta,
            createdBy: profile.firstName + " " + profile.lastName,
            authorId,
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
            re.answeredById = authorId;
            re.answeredAt = new Date();

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

export const deletePregunta = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("preguntas").doc(id).delete()
    }
}

export const editPregunta = (id, pregunta) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        //Va aser con algo de .doc() para señalar cual
        //Ejemplo:
        // const cityRef = db.collection('cities').doc('DC');
        // const res = await cityRef.update({ capital: true });
        // console.log("editPregunta, ", pregunta)

        firestore.collection("preguntas").doc(id).update({
            ...pregunta,
            updatedAt: new Date(),
            updatedBy: profile.firstName + " " + profile.lastName,
            editorId: authorId
        }).then(() => {
            dispatch({ type: "CREATE_PREGUNTA" }, pregunta)
        }).catch((err) => {
            dispatch({ type: "CREATE_PREGUNTA_ERROR" }, err)
        })

    }
}

export const getPregunta = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        var docRef = firestore.collection("preguntas").doc(id);

        return docRef.get()
            .then((doc) => {
                // console.log("did I get passes .then")
                if (doc.exists) {
                    //console.log("this: ", doc.data())
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });

    }
}