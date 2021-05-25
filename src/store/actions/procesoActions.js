
export const createProceso = (proceso) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        console.log("Pasa por actionProceso", proceso)

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
