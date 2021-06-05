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
        firestore.collection("auditorias").doc(id).delete()
    }
}

const asyncCall = async (dispatch, getFirestore, collection, id) => {

    const firestore = getFirestore();

    var docRef = firestore.collection(collection).doc(id);

    return docRef.get()
        .then((doc) => {
            if (doc.exists) {
                return {...doc.data(), id}
            }
        }).catch((err) => {
            console.log(err)
        });
}


export const preguntasAuditoria = (auditoria) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        let x = await asyncCall(dispatch, getFirestore, "auditorias", auditoria.id);

        const result = await Promise.all(x.preguntas.map(async (id) => {
            return await asyncCall(dispatch, getFirestore, "preguntas", id)
        })).then((values) => {
            return values
        }).catch((err) => {
            console.log(err)
        });

        dispatch({ type: "SUCCESSFULLY_EXTRACTED_PREGUNTAS_FROM_AUDITORIA" }, result)
        return result
    }
}

const asyncWhereCall = async (dispatch, getFirestore, collection, param, value) => {

    const firestore = getFirestore();

    const docRef = firestore.collection(collection).where(param, "==", value);

    const snap = await docRef.get()
    var res = []
    if (snap.empty) {
        console.log('No matching documents.');
    } else {
        snap.forEach(doc => {
            res.push(doc.data())
        });
    }

    return res
}

export const preguntasAuditoriaVoting = (auditoria) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        let x = await asyncCall(dispatch, getFirestore, "auditorias", auditoria.id);

        const result = await Promise.all(x.preguntas.map(async (id) => {
            var pregunta = await asyncCall(dispatch, getFirestore, "preguntas", id);
            var respuestas = await asyncWhereCall(dispatch, getFirestore, "respuestas", "auditoria_pregunta", auditoria.id + "_" + id)
            return {...pregunta, respuestas}
        })).then((values) => {
            return values
        }).catch((err) => {
            console.log(err)
        });

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
                if (doc.exists) {
                    return doc.data()
                }
            }).catch((err) => {
                console.log(err)
            });

    }
}