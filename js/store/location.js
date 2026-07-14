function hitungJarak(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; 
}

const tombolTerdekat = document.getElementById('find-nearest');
if (tombolTerdekat) {
    tombolTerdekat.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Browser kamu tidak mendukung pencarian lokasi (GPS).');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const semuaCard = document.querySelectorAll('.card-toko');

                semuaCard.forEach(card => {
                    const tokoLat = parseFloat(card.dataset.lat);
                    const tokoLon = parseFloat(card.dataset.lon);

                    if (!isNaN(tokoLat) && !isNaN(tokoLon)) {
                        const jarak = hitungJarak(userLat, userLon, tokoLat, tokoLon);
                        const jarakEl = card.querySelector('.jarak');
                        if (jarakEl) {
                            jarakEl.textContent = ` (${jarak.toFixed(1)} km)`;
                        }
                    }
                });

                alert('Jarak kuliner terdekat berhasil dihitung!');
            },
            () => {
                alert('Gagal mengambil lokasi. Pastikan izin GPS kamu aktif.');
            }
        );
    });
}
