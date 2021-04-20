const form = document.querySelector('.form');
const alertWarning = document.querySelector('.alert-warning');
const alertSuccess = document.querySelector('.alert-success');
const btnCloseWarning = document.querySelector('.btn-close-alert-warning');
const btnCloseSuccess = document.querySelector('.btn-close-alert-success');

auth.onAuthStateChanged((user) => {
    if (user) {
        btnCloseSuccess.addEventListener('click', () => {
            alertSuccess.classList.remove('show');
            alertSuccess.style.zIndex = '1';
        })

        btnCloseWarning.addEventListener('click', () => {
            alertWarning.classList.remove('show');
            alertWarning.style.zIndex = "1";
        })

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let i = false;
            let index = form.index.value.toUpperCase();

            db.collection('magazyn').doc('mag4').collection(index).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    if (form.miejsce.value.toUpperCase() === doc.data().miejsce && form.partia.value === doc.data().partia) i = true;
                })

                if (!i) {
                    db.collection('magazyn').doc('mag4').collection(index).add({
                        miejsce: form.miejsce.value.toUpperCase(),
                        partia: form.partia.value
                    })
                    alertSuccess.classList.add('show');
                    alertSuccess.style.zIndex = '10';
                } else {
                    alertWarning.style.zIndex = "10";
                    alertWarning.classList.add('show');
                }

                form.index.value = '';
                form.partia.value = '';
            });
        })
    } else {
        window.location.href = '../../sides/login/login.html';
    }
})