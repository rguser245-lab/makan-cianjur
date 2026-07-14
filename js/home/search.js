// ==========================================
// 5. SISTEM PENCARIAN REAL-TIME
// ==========================================
// Diperbaiki: sekarang cukup memicu fungsi gabungan dari filter.js supaya
// filter kategori yang sedang aktif tetap dihormati saat user mengetik.
const inputCari = document.getElementById('search-input');
if (inputCari) {
    inputCari.addEventListener('input', () => {
        if (typeof terapkanFilterDanPencarian === 'function') {
            terapkanFilterDanPencarian();
        }
    });
}
