// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEm6u5l44iELTgKbhKf0eMo78LX7lTiz4",
    authDomain: "stockitems-33140.firebaseapp.com",
    projectId: "stockitems-33140",
    storageBucket: "stockitems-33140.appspot.com",
    messagingSenderId: "862817573668",
    appId: "1:862817573668:web:f7880f72cd01791dc671b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});
const auth = firebase.auth();