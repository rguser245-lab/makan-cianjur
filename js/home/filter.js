const semuapills = document.querySelectorAll('.kategori-pill');
const semuaCardToko = document.querySelectorAll('.card-toko');
const inputCariEl = document.getElementById('search-input');

let filterKategoriAktif = 'semua';

// Diperbaiki: sebelumnya filter.js dan serch.js masing-masing menimpa
// card.style.display sendiri-sendiri, jadi kalau filter kategori aktif lalu
// user mengetik di kolom pencarian, hasil pencarian bisa menampilkan toko
// dari kategori lain (dua sistem saling menimpa, bukan digabung).
// Sekarang keduanya lewat satu fungsi ini supaya filter kategori DAN kata
// kunci pencarian sama-sama harus cocok (logika AND).
function terapkanFilterDanPencarian() {
    const kataKunci = inputCariEl ? inputCariEl.value.toLowerCase().trim() : '';

    semuaCardToko.forEach(card => {
        const kategoriToko = card.getAttribute('data-kategori').toLowerCase();
        const namaToko = card.querySelector('h3').textContent.toLowerCase();
        const lokasiToko = card.querySelector('.lokasi').textContent.toLowerCase();

        const cocokFilter = (filterKategoriAktif === 'semua' || kategoriToko.includes(filterKategoriAktif));
        const cocokCari = (kataKunci === '' || namaToko.includes(kataKunci) || lokasiToko.includes(kataKunci));

        card.style.display = (cocokFilter && cocokCari) ? 'flex' : 'none';
    });
}

semuapills.forEach(pill => {
    pill.addEventListener('click', () => {
        semuapills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        filterKategoriAktif = pill.getAttribute('data-filter');
        terapkanFilterDanPencarian();
    });
});
