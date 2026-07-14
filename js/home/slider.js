/* js/slider.js - Logika Geser Otomatis */

let indeksSlideSaatIni = 0;
const slides = document.querySelectorAll('.steam-slide');
const dots = document.querySelectorAll('.steam-slider-dots .dot');
const intervalWaktu = 4000; // 4000 milidetik = 4 detik sekali geser

function tampilkanSlide(indeks) {
    if (slides.length === 0) return;

    // Jika indeks melebihi jumlah slide, balik ke awal
    if (indeks >= slides.length) {
        indeksSlideSaatIni = 0;
    } 
    // Jika indeks kurang dari 0, pergi ke slide paling akhir
    else if (indeks < 0) {
        indeksSlideSaatIni = slides.length - 1;
    } else {
        indeksSlideSaatIni = indeks;
    }

    // Reset semua slide dan titik navigasi agar tidak aktif
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Aktifkan slide dan titik navigasi yang sesuai dengan indeks saat ini
    slides[indeksSlideSaatIni].classList.add('active');
    if (dots[indeksSlideSaatIni]) {
        dots[indeksSlideSaatIni].classList.add('active');
    }
}

// Fungsi agar user bisa klik titik navigasi untuk pindah slide secara manual
function pindahSlide(indeks) {
    tampilkanSlide(indeks);
    resetTimer(); // Reset timer otomatis saat diklik manual agar tidak mendadak geser
}

// Menjalankan geser otomatis
let slideTimer = setInterval(() => {
    tampilkanSlide(indeksSlideSaatIni + 1);
}, intervalWaktu);

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        tampilkanSlide(indeksSlideSaatIni + 1);
    }, intervalWaktu);
}