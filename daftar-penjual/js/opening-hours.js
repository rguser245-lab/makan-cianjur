function cekStatusDetail() {
    // Diperbaiki: sebelumnya fungsi ini HANYA memproses elemen .card-toko, jadi di
    // halaman detail (mis. depdoo.html) yang tidak punya .card-toko sama sekali,
    // status buka/tutup tidak pernah terisi. Sekarang: kalau halaman punya kartu
    // toko (index.html), proses tiap kartu satu-satu. Kalau tidak ada kartu sama
    // sekali (halaman detail satu produk), anggap seluruh halaman sebagai satu unit.
    const daftarCard = document.querySelectorAll('.card-toko');
    const unitList = daftarCard.length > 0 ? Array.from(daftarCard) : [document];

    unitList.forEach(prosesStatusUnit);
}

function prosesStatusUnit(unit) {
    const waktu = new Date();
    const totalMenit = (waktu.getHours() * 60) + waktu.getMinutes();
    const hariSekarang = waktu.getDay(); // 0 = Minggu, 1 = Senin, dst.
    const lang = localStorage.getItem('bahasa') || 'id';

    // .status-toko dipakai di kartu index.html, .status-detail dipakai di halaman detail
    const statusEl = unit.querySelector('.status-toko, .status-detail');
    const jamOpEl = unit.querySelector('.jam-operasional');
    const jadwalList = unit.querySelectorAll('.jadwal-list li');

    let jamBuka = null;
    let jamTutup = null;
    let isLibur = false;
    let teksJam = "";
    let adaData = false;

    if (jadwalList.length > 0) {
        // Format A: jadwal detail per-hari (dipakai index.html kartu Depdoo & depdoo.html)
        jadwalList.forEach(li => {
            const dataHari = parseInt(li.getAttribute('data-hari'));

            if (dataHari === hariSekarang) {
                li.classList.add('hari-ini');
                adaData = true;

                if (li.getAttribute('data-libur') === 'true') {
                    isLibur = true;
                } else {
                    jamBuka = parseInt(li.getAttribute('data-buka')) || 0;
                    jamTutup = parseInt(li.getAttribute('data-tutup')) || 0;
                }

                const spanJam = li.querySelector('.jam');
                if (spanJam) teksJam = spanJam.textContent;
            } else {
                li.classList.remove('hari-ini');
            }
        });
    } else if (unit.hasAttribute && unit.hasAttribute('data-buka') && unit.hasAttribute('data-tutup')) {
        // Format B: jam sederhana "HH:MM" langsung di kartu, berlaku tiap hari
        const [bukaJam, bukaMenit] = unit.getAttribute('data-buka').split(':').map(Number);
        const [tutupJam, tutupMenit] = unit.getAttribute('data-tutup').split(':').map(Number);

        if (!isNaN(bukaJam) && !isNaN(tutupJam)) {
            jamBuka = (bukaJam * 60) + (bukaMenit || 0);
            jamTutup = (tutupJam * 60) + (tutupMenit || 0);
            adaData = true;
        }
    }

    if (!adaData) return; // unit tanpa data jam operasional, lewati

    if (jamOpEl && teksJam) {
        jamOpEl.textContent = teksJam;
    }

    if (!statusEl) return;

    // Pakai classList (bukan menimpa className) supaya class "status-toko"/"status-detail"
    // yang sudah ada tidak hilang, dan status masih bisa dicari ulang saat bahasa diganti.
    statusEl.classList.remove('status-buka', 'status-tutup');
    if (!statusEl.classList.contains('status-detail') && !statusEl.classList.contains('status-toko')) {
        statusEl.classList.add('status-detail');
    }

    if (isLibur) {
        statusEl.textContent = lang === 'id' ? "🔴 Tutup (Hari Libur)" : "🔴 Closed (Holiday)";
        statusEl.classList.add('status-tutup');
    } else if (totalMenit >= jamBuka && totalMenit < jamTutup) {
        statusEl.textContent = lang === 'id' ? "🟢 Buka Sekarang" : "🟢 Open Now";
        statusEl.classList.add('status-buka');
    } else {
        statusEl.textContent = lang === 'id' ? "🔴 Tutup" : "🔴 Closed";
        statusEl.classList.add('status-tutup');
    }
}

// Jalankan begitu DOM siap, jangan cuma bergantung dipanggil dari bahasa.js
document.addEventListener('DOMContentLoaded', cekStatusDetail);
