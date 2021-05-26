
export const createProceso = (proceso) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        // console.log("Pasa por actionProceso", proceso)

        firestore.collection('procesos').add({
            ...proceso,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROCESO_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_PROCESO_ERROR' }, err);
        });
    }
};


export const editProceso = (id, proceso) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        // console.log("Llegamos tan lejos?")

        firestore.collection("procesos").doc(id).update({
            ...proceso,
            updatedAt: new Date(),
            updatedBy: profile.firstName + " " + profile.lastName,
            editorId: authorId
        }).then(() => {
            dispatch({ type: "EDIT_PROCESO" }, proceso)
        }).catch((err) => {
            console.log("Falló")
            dispatch({ type: "EDIT_PROCESO_ERROR" }, err)
        })

    }
}

export const deleteProceso = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("procesos").doc(id).delete()
    }
}

export const getProceso = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        var docRef = firestore.collection("procesos").doc(id);

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