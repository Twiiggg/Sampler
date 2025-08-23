import { app, auth, db, doc, setDoc } from "firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function showMessage(message, divId, status) {
   const div = document.createElement('div');
    div.innerHTML = ``
}

// cadastro de usuários no firestore
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault() //previne o comportamento padrão do evento

    //pegando os dados do usuário
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; //usuário autenticado
        const userData = { email, userName } //dados do usuário para salvar  

        //função de mensagem exibindo mensagem de sucesso no cadastro


        // salvando os dados no Firestore
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = "auth.html"
        })
        .catch((error) => {
            console.error("Erro ao criar novo usuário, tente novamente", error);
        });
    })
    .catch((error)=>{
        const errorCode = error.code;
        if (errorCode == "auth/email-already-is-use"){
            showMessage("Endereço de email já existe");
        } else {
            showMessage("Erro ao criar novo usuário")
        }
    });
})

// login do usuário com o firebase
const signIn = document.getElementById('submitsignIn');
signIn.addEventListener ('click', (event) =>{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
        showMessage('Usuário autenticado com sucesso!', 'signInMessage')
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid); //salva o id do usuário no localStorage 
        window.location.href = 'home.html';
    })
    .catch((error) => {
        
    })
})
