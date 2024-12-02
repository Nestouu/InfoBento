// main.js
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Vous avez cliqué sur ${item.textContent}`);
    });
});
