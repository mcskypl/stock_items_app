btnCloseSuccess.addEventListener('click', () => {
    alertSuccess.classList.remove('show');
})

const addIndexFn = (indexValue) => {
    addIndex.addEventListener('click', () => {
        console.log(indexValue);
        form.classList.remove('hiddenClass');
        szukaj.classList.add('hiddenClass');
        addIndex.classList.add('hiddenClass');

        btnCloseSuccessAdd.addEventListener('click', () => {
            alertSuccessAdd.classList.remove('show');
            alertSuccessAdd.style.zIndex = '1';
        })

        btnCloseWarning.addEventListener('click', () => {
            alertWarningAdd.classList.remove('show');
            alertWarningAdd.style.zIndex = "1";
        })

        badgeIndex.innerHTML = `<h1>${indexValue}</h1>`;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let i = false;
            let index = indexValue;

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

                form.partia.value = '';
            });
        })
    })
}

// *-------------------------------------------------------------------------------------------- RENDER LIST
const renderListFn = (doc) => {
    //console.log(doc);
    let li = document.createElement('div');
    // let index = document.createElement('span');
    let partia = document.createElement('span');
    let miejsce = document.createElement('span');
    let trash = document.createElement('i');

    li.setAttribute('data-id', doc.id);
    li.className = 'list2';
    miejsce.className = 'miejsce';
    trash.className = 'bi bi-trash';

    // index.textContent = ai;
    partia.textContent = doc.data().partia;
    miejsce.textContent = doc.data().miejsce;

    // li.appendChild(index);
    li.appendChild(miejsce);
    li.appendChild(partia);
    li.appendChild(trash);

    list.appendChild(li);

    // *-------------------------------------------------------------------------------------------- DELETING DATA
    trash.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.target.parentElement.getAttribute('data-id');
        bgModal.classList.remove('hiddenClass');

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(id);

            //console.log(szukaj.numer.value.toUpperCase());
            db.collection('magazyn').doc('mag4').collection(szukaj.numer.value.toUpperCase()).doc(id).delete();

            //id = '';
            bgModal.classList.add('hiddenClass');
            alertSuccess.classList.add('show');
        })

        stayButton.addEventListener('click', (e) => {
            e.preventDefault();
            id = '';
            bgModal.classList.add('hiddenClass');
        })
    })
    // !-------------------------------------------------------------------------------------------- DELETING DATA
}
// !-------------------------------------------------------------------------------------------- RENDER LIST

auth.onAuthStateChanged((user) => {
    if (user) {
        // *-------------------------------------------------------------------------------------------- SEARCH IN DB
        szukaj.addEventListener('submit', (e) => {
            e.preventDefault();

            brak.innerHTML = '';
            list.innerHTML = '';

            let indexValue = szukaj.numer.value.toUpperCase();

            addIndexFn(indexValue);

            addIndex.classList.remove('hiddenClass');
            addIndex.innerHTML = 'Dodaj ' + indexValue;
            

            // *-------------------------------------------------------------------------------------------- REAL TIME LISTENER
            db.collection('magazyn').doc('mag4').collection(indexValue).onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    console.log(change.type);
                    if (change.type === 'removed') {
                        let li = list.querySelector('[data-id=' + change.doc.id + ']');
                        list.removeChild(li);
                    }
                    if (change.type === 'added') {
                        renderListFn(change.doc)
                        console.log(change.doc)
                    }
                })
            })
            // !-------------------------------------------------------------------------------------------- REAL TIME LISTENER
        })
        // !-------------------------------------------------------------------------------------------- SEARCH IN DB


    } else {
        window.location.href = '../../sides/login/login.html';
    }
});