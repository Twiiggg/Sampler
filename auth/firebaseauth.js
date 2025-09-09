import { app, auth, db, doc, setDoc } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "../firebaseConfig";

function showMessage({status, message}) {
    const toast = document.getElementById('toast');
    const div = document.createElement('div');
    const titulo = document.getElementById('title');
    titulo.classList.add('title');
    const msg = document.getElementById('message');
    div.classList.add('toast-content');
    div.id += toastId;
    if (status === "Sucesso") {
        div.classList.add('sucess');
        i.classList.add('fa-square-check');
        i.style.color = '#009d40';
    } else if (status === "alert"){
        div.classList.add('Alerta');
        i.classList.add('fa-triangle-exclamation');
        i.style.color = "#ffc000";
    } else {
        div.classList.add('error');
        i.classList.add('fa-xmark');
        i.style.color="#ff0000";
    }
    toast.showModal()
    titulo.innerText = status;
    msg.innerText = message;
    div.style.transition = ".5s ease-in-out";
    setTimeout(() => {
        toast.close()
    }, 3000); // a msg dura 3 seg, dps desaparece
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
        showMessage({
            status: "Sucesso",
            message: "Usuário cadastrado com sucesso!"
        });

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
            showMessage({
                status: "Alerta",
                message: "Existe uma conta com esse e-mail. Faça login para continuar",
            });
        } else {
            showMessage({
                status: "Erro",
                message: "Falha ao criar novo usuário, tente novamente",
            });
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
        showMessage({
            status: "Sucesso",
            message: "Usuário autenticado, bem-vindo!",
        });
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid); //salva o id do usuário no localStorage 
        window.location.href = '../views/home.html';
    })
    .catch(error =>{
        if (errorCode == "auth/invalid-credential"){
            showMessage({status:"Alerta", message:"E-mail ou senha inválidos, tente novamente"});
        } else {
            showMessage({status: "Erro", message: "Erro ao validar login"});
        }
    });
});

const popup = document.getElementById('gPopup');
popup.addEventListener('click', event => {
    event.preventDefault();

    signInWithPopup(auth, provider)
    .then()
})
