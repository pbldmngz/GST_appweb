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

const asyncCall = async (dispatch, getFirestore, collection, id) => {
    const firestore = getFirestore();

    //console.log("this is auditoria here: ", auditoria)
    var docRef = firestore.collection(collection).doc(id);

    return docRef.get()//FIND() //.add()
        .then((doc) => {
            if (doc.exists) {
                //console.log("this: ", doc.data())
                return doc.data()
            }
        }).catch((err) => {
            console.log(err)
        });
}

export function preguntasAuditoria (auditoria) {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, preguntas)
        let x = await asyncCall(dispatch, getFirestore, "auditorias", auditoria.id);

        const result = await Promise.all(x.preguntas.map(async (id) => {
            return await asyncCall(dispatch, getFirestore, "preguntas", id)
        }))

        //console.log(result)

        return await result
    }
}
