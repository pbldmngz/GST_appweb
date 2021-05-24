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
