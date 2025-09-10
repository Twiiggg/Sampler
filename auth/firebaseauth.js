// auth.js
import { app, auth, db } from "../firebaseConfig.js"; // -> note o .js
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

// função de toast/mensagem (corrigida)
function showMessage(status, message) {
    const toast = document.querySelector("dialog");
    if (!toast) {
        console.warn("Elemento <dialog> não encontrado.");
        alert(`${status}: ${message}`);
        return;
    }
    const title = document.getElementById("title");
    const icon = toast.querySelector("i");
    const msg = document.getElementById("message");

    // limpa classes/ícones anteriores
    toast.classList.remove("sucess", "alert", "error");
    if (icon) {
        icon.classList.remove("fa-square-check", "fa-triangle-exclamation", "fa-xmark");
        icon.style.color = "";
    }

    toast.style.transition = ".5s ease-in-out";

    if (status === "Sucesso") {
        toast.classList.add("sucess");
        if (icon) icon.classList.add("fa-square-check");
    } else if (status === "Alerta") {
        toast.classList.add("alert");
        if (icon) {
            icon.classList.add("fa-triangle-exclamation");
            icon.style.color = "#ffc000";
        }
    } else {
        toast.classList.add("error");
        if (icon) {
            icon.classList.add("fa-xmark");
            icon.style.color = "#ff0000";
        }
    }

    if (title) title.innerText = status;
    if (msg) msg.innerText = message;

    toast.showModal();
    setTimeout(() => toast.close(), 3000);
}

// ---------- SIGN UP ----------
const signUpBtn = document.getElementById("submitSignUp");
if (signUpBtn) {
    signUpBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const userName = document.getElementById("userName")?.value?.trim();
        const email = document.getElementById("rEmail")?.value?.trim();
        const password = document.getElementById("rPassword")?.value;

        if (!email || !password) {
            showMessage("Alerta", "Preencha e-mail e senha para se cadastrar.");
            return;
        }
        if (password.length < 6) {
            showMessage("Alerta", "A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = { email, userName: userName || "", createdAt: new Date().toISOString() };

            // salva no Firestore
            await setDoc(doc(db, "users", user.uid), userData);

            showMessage("Sucesso", "Usuário cadastrado com sucesso!");
            localStorage.setItem("loggedInUserId", user.uid);
            // pequeno delay pra mensagem aparecer
            setTimeout(() => (window.location.href = "auth.html"), 900);
        } catch (error) {
            console.error("Erro no signUp:", error);
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                showMessage("Alerta", "Existe uma conta com esse e-mail. Faça login para continuar.");
            } else if (errorCode === "auth/invalid-email") {
                showMessage("Alerta", "E-mail inválido.");
            } else if (errorCode === "auth/weak-password") {
                showMessage("Alerta", "Senha fraca. Use pelo menos 6 caracteres.");
            } else {
                showMessage("Erro", "Falha ao criar novo usuário, tente novamente.");
            }
        }
    });
}

// ---------- SIGN IN ----------
const signInBtn = document.getElementById("submitSignIn");
if (signInBtn) {
    signInBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const email = document.getElementById("email")?.value?.trim();
        const password = document.getElementById("password")?.value;

        if (!email || !password) {
            showMessage("Alerta", "Preencha e-mail e senha para entrar.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            showMessage("Sucesso", "Usuário autenticado, bem-vindo!");
            localStorage.setItem("loggedInUserId", user.uid);
            setTimeout(() => (window.location.href = "../views/home.html"), 800);
        } catch (error) {
            console.error("Erro no signIn:", error);
            const errorCode = error.code;
            if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                showMessage("Alerta", "E-mail ou senha inválidos, tente novamente.");
            } else if (errorCode === "auth/invalid-email") {
                showMessage("Alerta", "E-mail inválido.");
            } else {
                showMessage("Erro", "Erro ao validar login.");
            }
        }
    });
}

// ---------- GOOGLE POPUP ----------
const popupBtn = document.getElementById("gPopup");
if (popupBtn) {
    popupBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // salva ou atualiza usuário no Firestore (opcional)
            await setDoc(doc(db, "users", user.uid), { email: user.email, displayName: user.displayName }, { merge: true });
            showMessage("Sucesso", "Logado com Google!");
            localStorage.setItem("loggedInUserId", user.uid);
            setTimeout(() => (window.location.href = "../views/home.html"), 800);
        } catch (error) {
            console.error("Erro no signInWithPopup:", error);
            showMessage("Erro", "Falha no login com Google.");
        }
    });
}
