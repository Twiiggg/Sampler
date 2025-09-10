const goToSignup = document.getElementById('goToSignup');
const goToSignin = document.getElementById('goToSignin');
const container = document.querySelector('.container');

goToSignup.addEventListener('click', () => {
    container.classList.add('change');
})

goToSignin.addEventListener('click', () => {
    container.classList.remove('change');
})