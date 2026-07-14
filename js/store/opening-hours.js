function cekStatusDetail() {
    const waktu = new Date();
    const totalMenit = (waktu.getHours() * 60) + waktu.getMinutes();
    const hariSekarang = waktu.getDay(); // 0 = Minggu, 1 = Senin, dst.
    const lang = localStorage.getItem('bahasa') || 'id';

    // Diperbaiki: sekarang memproses SETIAP kartu toko (.card-toko), bukan cuma satu
    // elemen ber-ID tunggal. Sebelumnya toko ke-2 & ke-3 tidak pernah dapat status
    // karena skrip lama hanya membaca #status-detail (ID unik) dan .jadwal-list
    // (yang cuma ada di kartu pertama).
    document.querySelectorAll('.card-toko').forEach(card => {
        const statusEl = card.querySelector('.status-toko');
        const jamOpEl = card.querySelector('.jam-operasional');
        const jadwalList = card.querySelectorAll('.jadwal-list li');

        let jamBuka = null;
        let jamTutup = null;
        let isLibur = false;
        let teksJam = "";
        let adaData = false;

        if (jadwalList.length > 0) {
            // Format A: jadwal detail per-hari (seperti kartu Depdoo)
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
        } else if (card.hasAttribute('data-buka') && card.hasAttribute('data-tutup')) {
            // Format B: jam sederhana "HH:MM" langsung di kartu, berlaku tiap hari
            const [bukaJam, bukaMenit] = card.getAttribute('data-buka').split(':').map(Number);
            const [tutupJam, tutupMenit] = card.getAttribute('data-tutup').split(':').map(Number);

            if (!isNaN(bukaJam) && !isNaN(tutupJam)) {
                jamBuka = (bukaJam * 60) + (bukaMenit || 0);
                jamTutup = (tutupJam * 60) + (tutupMenit || 0);
                adaData = true;
            }
        }

        if (!adaData) return; // kartu tanpa data jam operasional, lewati

        if (jamOpEl && teksJam) {
            jamOpEl.textContent = teksJam;
        }

        if (!statusEl) return;

        // Pakai classList (bukan menimpa className) supaya class "status-toko"
        // tidak hilang, dan status masih bisa dicari ulang saat bahasa diganti.
        statusEl.classList.remove('status-buka', 'status-tutup');
        if (!statusEl.classList.contains('status-detail')) {
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
    });
}

// Jalankan begitu DOM siap, jangan cuma bergantung dipanggil dari bahasa.js
document.addEventListener('DOMContentLoaded', cekStatusDetail);
