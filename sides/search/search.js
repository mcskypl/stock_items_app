const list = document.querySelector('.list');
const szukaj = document.querySelector('.szukaj');
const alertSuccess = document.querySelector('.alert-success');
const btnCloseSuccess = document.querySelector('.btn-close-alert-success');

auth.onAuthStateChanged((user) => {
    if (user) {

        btnCloseSuccess.addEventListener('click', () => {
            alertSuccess.classList.remove('show');
        })

        function renderList(doc) {
            let li = document.createElement('div');
            // let index = document.createElement('span');
            let partia = document.createElement('span');
            let miejsce = document.createElement('span');
            let cross = document.createElement('i');

            li.setAttribute('data-id', doc.id);
            li.className = 'list2';
            miejsce.className = 'miejsce';
            cross.className = 'bi bi-trash';

            // index.textContent = ai;
            partia.textContent = doc.data().partia;
            miejsce.textContent = doc.data().miejsce;

            // li.appendChild(index);
            li.appendChild(miejsce);
            li.appendChild(partia);
            li.appendChild(cross);

            list.appendChild(li);

            //deleting data
            cross.addEventListener('click', (e) =>{
                e.stopPropagation();

                let id = e.target.parentElement.getAttribute('data-id');
                console.log(id);
                console.log(szukaj.numer.value.toUpperCase());
                db.collection('magazyn').doc('mag4').collection(szukaj.numer.value.toUpperCase()).doc(id).delete();
                alertSuccess.classList.add('show');
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