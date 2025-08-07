import { app, auth, db, doc, setDoc } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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
        function showMessage(message, divId) {
            const messageDiv = document.getElementById(divId);
            messageDiv.style.display = "block";
            messageDiv.innerHTML = message;
            messageDiv.style.opacity = 1
            messageDiv.style.transition = ".5s ease-in-out"
            setTimeout(function() {
                messageDiv.style.opacity = 0
            }, 5000) // a msg dura 5 seg, dps desaparece
        }

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

    const email = document.getElementById('rEmail');
    const password = document.getElementById('rPassword');

})
