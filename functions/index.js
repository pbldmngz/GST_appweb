const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.createUser = functions.https.onCall((data, context) => {

    const { newUser, userLevel } = data

    if (userLevel === 0) {
        return admin
            .auth()
            .createUser({
                email: newUser.email,
                password: newUser.password,
            })
            .then((userRecord) => {
                admin.firestore().collection("users").doc(userRecord.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    userLevel: newUser.level,
                    lang: newUser.lang,
                })
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
            });
    }

})


exports.changeLang = functions.https.onCall((data, context) => {
    console.log("Esta madre funciona?", data)

    return admin.firestore().collection('users').doc(data.uid).update({
        lang: data.idioma,
    }).then(res => {
        // console.log("This is res", res)
        return res
    }).catch(err => {
        console.log("Error:", err)
    })

})