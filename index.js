let logoutBtn = document.querySelector('.logout');

auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'sides/login/login.html';
    }
});

logoutBtn.addEventListener('click', () => {
    auth.signOut();
})

