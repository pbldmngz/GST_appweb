import { firebase } from "react-redux-firebase";

export const createAuditoria = (auditoria) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        firestore.collection("auditorias").add({
            ...auditoria,
            createdBy: profile.firstName + " " + profile.lastName,
            createdAt: new Date(),
            authorId,
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

export const editAuditoria = (id, auditoria) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        console.log("This is what I get: ", id, auditoria)

        firestore.collection("auditorias").doc(id).update({
            ...auditoria,
            updatedAt: new Date(),
            updatedBy: profile.firstName + " " + profile.lastName,
            editorId: authorId
        }).then(() => {
            dispatch({ type: "EDIT_AUDITORIA" }, auditoria)
        }).catch((err) => {
            dispatch({ type: "EDIT_AUDITORIA_ERROR" }, err)
        })

    }
}

export const deleteAuditoria = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("auditorias").doc(id).delete()
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
                return {...doc.data(), id}
            }
        }).catch((err) => {
            console.log(err)
        });
}


export const preguntasAuditoria = (auditoria) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, preguntas)
        let x = await asyncCall(dispatch, getFirestore, "auditorias", auditoria.id);

        const result = await Promise.all(x.preguntas.map(async (id) => {
            return await asyncCall(dispatch, getFirestore, "preguntas", id)
        })).then((values) => {
            // console.log("Values: ", values)
            // if (values.exist) {
                return values
            // }
            // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, values)
            
        }).catch((err) => {
            console.log(err)
        });

        console.log("this is X before", result)
        dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, result)
        return result
    }
}

const asyncWhereCall = async (dispatch, getFirestore, collection, param, value) => {
    const firestore = getFirestore();
    // console.log("asyncWhereCall: ", collection, param, value)
    //console.log("this is auditoria here: ", auditoria)
    const docRef = firestore.collection(collection).where(param, "==", value);

    const snap = await docRef.get()
    var res = []
    if (snap.empty) {
        console.log('No matching documents.');
        // return;
    } else {
        snap.forEach(doc => {
            res.push(doc.data())
            // console.log("ElseWhere", doc.id, '=>', doc.data());
        });
    }

    return res
}

export const preguntasAuditoriaVoting = (auditoria) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, preguntas)
        let x = await asyncCall(dispatch, getFirestore, "auditorias", auditoria.id);

        const result = await Promise.all(x.preguntas.map(async (id) => {
            var pregunta = await asyncCall(dispatch, getFirestore, "preguntas", id);
            // console.log(auditoria.id, typeof auditoria.id, id, typeof id)
            var respuestas = await asyncWhereCall(dispatch, getFirestore, "respuestas", "auditoria_pregunta", auditoria.id + "_" + id)
            return {...pregunta, respuestas}
        })).then((values) => {
            // console.log("Values: ", values)
            // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, values)
            return values
        }).catch((err) => {
            console.log(err)
        });

        // console.log("this is X in the new fuction", result)
        dispatch({ type: 'SUCCESSFULLY_EXTRACTED_RESPUESTAS_PREGUNTAS_FROM_AUDITORIA' }, result)
        return result
    }
}

export const getAuditoria = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        var docRef = firestore.collection("auditorias").doc(id);

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

// //Se recibe el ID
// export const failedVersion = (auditoria) => {
//     return async (dispatch, getState, { getFirebase, getFirestore }) => {
//         // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, preguntas)
//         let x = await preguntasAuditoria(auditoria);

//         console.log("this is X", x)

//         const result = await Promise.all(x.map(async (pregunta) => {
//             var exData = await asyncWhereCall(dispatch, getFirestore, "respuestas", "auditoria_pregunta", auditoria + "_" + pregunta.id)

//             return {...pregunta, voting: exData}
//         })).then((values) => {
//             // console.log("Values: ", values)
//             // dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, values)
//             return values
//         }).catch((err) => {
//             console.log(err)
//         });

//         //console.log(result)
//         dispatch({ type: 'SUCCESSFULLY_EXTRACTED_RESPUESTAS_PREGUNTAS_FROM_AUDITORIA' }, result)
//         return result
//     }
// }