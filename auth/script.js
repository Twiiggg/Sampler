const goToSignup = document.getElementById('goToSignup');
const goToSignin = document.getElementById('goToSignin');
const container = document.getElementById('container');

goToSignup.addEventListener('click', () => {
    container.classList.toggle('change');
})

goToSignin.addEventListener('click', () => {
    container.classList.toggle('change');
})