// import functions from '';
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.changeLang = (uid, lang) => {
    return admin.firestore().collection("users").doc(uid).set({
        lang: lang,
    }, { merge: true }).then(doc => console.log("Language changed!"))
}

exports.createUser = (userLevel, newUser) => {
    if (userLevel === 0) {
        admin
            .auth()
            .createUser({
                email: user.email,
                password: 'secretPassword',
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                admin.firestore().collection("users").doc(userRecord.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0],
                    userLevel: newUser.level,
                    lang: newUser.lang,
                })
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
            });
    }
}