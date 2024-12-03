// main.js
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Vous avez cliqué sur ${item.textContent}`);
    });
});

document.querySelector('.show-password').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈'; // Change l'icône
});