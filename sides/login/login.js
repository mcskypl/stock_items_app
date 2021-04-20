let form = document.querySelector('.login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = form.email.value;
    let password = form.password.value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential.displayName)
            console.log('zalogowano')
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
        });
})

auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.href = '../../index.html';
    }
});

// firebase.auth().signOut();