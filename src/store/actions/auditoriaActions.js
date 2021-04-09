import { firebase } from "react-redux-firebase";

export const createAuditoria = (auditoria) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        firestore.collection("auditorias").add({
            ...auditoria,
            createdBy: profile.firstName + " " + profile.lastName,
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

export const preguntasAuditoria = (auditoria) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        //console.log("this is auditoria here: ", auditoria)
        var docRef = firestore.collection("auditorias").doc(auditoria.id);

        docRef.get()//FIND() //.add()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data()
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).then((data) => {
                const preguntas = data.preguntas //Esto es un array
                console.log(preguntas)
                dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, preguntas)
            }).catch((error) => {
                dispatch({ type: "FAILED_EXTRACT_PREGUNTAS_FROM_AUDITORIA" }, error)
            });
    }
}
