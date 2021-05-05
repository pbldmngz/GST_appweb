export const editIdioma = (uid, idioma) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        // console.log("UID-IDIOMA:", uid, idioma)

        firestore.collection("users").doc(uid).update({
            lang: idioma
        }).then(() => {
            dispatch({ type: "EDIT_IDIOMA" }, idioma)
        }).catch((err) => {
            dispatch({ type: "EDIT_IDIOMA_ERROR" }, err)
        })

    }
}