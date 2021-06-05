export const createArea = (area) => {
    return (dispatch, getState, { getFirestore }) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('areas').add({
            ...area,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_AREA_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_AREA_ERROR' }, err);
        });
    }
};


export const editArea = (id, area) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("areas").doc(id).update({
            ...area,
            updatedAt: new Date(),
            updatedBy: profile.firstName + " " + profile.lastName,
            editorId: authorId
        }).then(() => {
            dispatch({ type: "EDIT_AREA" }, area)
        }).catch((err) => {
            dispatch({ type: "EDIT_AREA_ERROR" }, err)
        })

    }
}

export const deleteArea = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        firestore.collection("areas").doc(id).delete();
    }
}

export const getArea = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        var docRef = firestore.collection("areas").doc(id);

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