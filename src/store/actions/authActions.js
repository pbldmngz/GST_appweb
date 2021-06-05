export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });

    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
        const firebase = getFirebase();
        const profile = getState().firebase.profile;

        const changeLang = firebase.functions().httpsCallable('createUser');

        changeLang({newUser: newUser, userLevel: profile.userLevel}).then((res) => {
            console.log("Creado nuevo usuario")
        });

    }
}