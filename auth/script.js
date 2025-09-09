const signInForm = document.getElementById('signin');
const signUpForm = document.getElementById('signup');

const signInBtn = document.querySelector('.login-btn');
const signUpBtn = document.getElementById('.cadastro');

signInBtn.addEventListener('click', function () {
    signUpForm.style.display= "none"
    signInForm.style.display= "block"
});

signUpBtn.addEventListener('click', function () {
    signUpForm.style.display= "block"
    signInForm.style.display= "none"
});