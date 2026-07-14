function cekStatusDetail() {
const daftarCard = document.querySelectorAll('.card-toko');
    const unitList = daftarCard.length > 0 ? Array.from(daftarCard) : [document];

    unitList.forEach(prosesStatusUnit);
}

function prosesStatusUnit(unit) {
    const waktu = new Date();
    const totalMenit = (waktu.getHours() * 60) + waktu.getMinutes();
    const hariSekarang = waktu.getDay();
    const lang = localStorage.getItem('bahasa') || 'id';
    const statusEl = unit.querySelector('.status-toko, .status-detail');
    const jamOpEl = unit.querySelector('.jam-operasional');
    const jadwalList = unit.querySelectorAll('.jadwal-list li');

    let jamBuka = null;
    let jamTutup = null;
    let isLibur = false;
    let teksJam = "";
    let adaData = false;

    if (jadwalList.length > 0) {

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
        const [bukaJam, bukaMenit] = unit.getAttribute('data-buka').split(':').map(Number);
        const [tutupJam, tutupMenit] = unit.getAttribute('data-tutup').split(':').map(Number);

        if (!isNaN(bukaJam) && !isNaN(tutupJam)) {
            jamBuka = (bukaJam * 60) + (bukaMenit || 0);
            jamTutup = (tutupJam * 60) + (tutupMenit || 0);
            adaData = true;
        }
    }

    if (!adaData) return;

    if (jamOpEl && teksJam) {
        jamOpEl.textContent = teksJam;
    }

    if (!statusEl) return;

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

document.addEventListener('DOMContentLoaded', cekStatusDetail);
