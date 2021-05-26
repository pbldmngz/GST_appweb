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

        // console.log("Llegamos tan lejos?")

        firestore.collection("areas").doc(id).update({
            ...area,
            updatedAt: new Date(),
            updatedBy: profile.firstName + " " + profile.lastName,
            editorId: authorId
        }).then(() => {
            dispatch({ type: "EDIT_AREA" }, area)
        }).catch((err) => {
            console.log("Falló")
            dispatch({ type: "EDIT_AREA_ERROR" }, err)
        })

    }
}

export const deleteArea = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection("areas").doc(id).delete()
    }
}

export const getArea = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        var docRef = firestore.collection("areas").doc(id);

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