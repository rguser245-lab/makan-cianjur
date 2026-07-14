const inputCari = document.getElementById('search-input');
if (inputCari) {
    inputCari.addEventListener('input', () => {
        if (typeof terapkanFilterDanPencarian === 'function') {
            terapkanFilterDanPencarian();
        }
    });
}
