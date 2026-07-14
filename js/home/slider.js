let indeksSlideSaatIni = 0;
const slides = document.querySelectorAll('.steam-slide');
const dots = document.querySelectorAll('.steam-slider-dots .dot');
const intervalWaktu = 4000;

function tampilkanSlide(indeks) {
    if (slides.length === 0) return;

    if (indeks >= slides.length) {
        indeksSlideSaatIni = 0;
    } 
    else if (indeks < 0) {
        indeksSlideSaatIni = slides.length - 1;
    } else {
        indeksSlideSaatIni = indeks;
    }

f
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[indeksSlideSaatIni].classList.add('active');
    if (dots[indeksSlideSaatIni]) {
        dots[indeksSlideSaatIni].classList.add('active');
    }
}

function pindahSlide(indeks) {
    tampilkanSlide(indeks);
    resetTimer();
}

let slideTimer = setInterval(() => {
    tampilkanSlide(indeksSlideSaatIni + 1);
}, intervalWaktu);

function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        tampilkanSlide(indeksSlideSaatIni + 1);
    }, intervalWaktu);
}