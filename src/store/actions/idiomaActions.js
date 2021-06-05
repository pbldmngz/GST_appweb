export const editIdioma = (uid, idioma) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
        const firebase = getFirebase();

        const changeLang = firebase.functions().httpsCallable('changeLang');

        changeLang({uid, idioma}).then((res) => {
            console.log("Idioma cambiado:", idioma)
        });

    }
}