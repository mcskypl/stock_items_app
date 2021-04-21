const list = document.querySelector('.list');
const szukaj = document.querySelector('.szukaj');
const alertSuccess = document.querySelector('.alert-success');
const btnCloseSuccess = document.querySelector('.btn-close-alert-success');
const bgModal = document.querySelector('.bgModal');
const deleteButton = document.querySelector('.deleteButton');
const stayButton = document.querySelector('.stayButton');

btnCloseSuccess.addEventListener('click', () => {
    alertSuccess.classList.remove('show');
})

auth.onAuthStateChanged((user) => {
    if (user) {

        function renderList(doc) {
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

            //deleting data
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
        }

        szukaj.addEventListener('submit', (e) => {
            e.preventDefault();

            list.innerHTML = '';

            let zz = szukaj.numer.value.toUpperCase();
            console.log(zz)

            db.collection('magazyn').doc('mag4').collection(zz).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    //console.log(doc.data());
                    renderList(doc, szukaj.numer.value)
                })
            });

            //  real time listener

            db.collection('magazyn').doc('mag4').collection(zz).onSnapshot(snapshot => {
                let changes = snapshot.docChanges();
                // console.log(changes);
                changes.forEach(change => {
                    console.log(change.doc.data())
                    if (change.type == 'removed') {
                        let li = list.querySelector('[data-id=' + change.doc.id + ']');
                        list.removeChild(li);
                    }
                })
            })
        })


    } else {
        window.location.href = '../../sides/login/login.html';
    }
});