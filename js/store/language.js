const kamusBahasa = {
    id: {
        searchPlaceholder: "Cari kuliner...",
        heroTitle: "Kuliner Cianjur",
        heroDesc: "Pilihan tempat makan paling mantap & hits.",
        btnNearest: "Cari Kuliner Terdekat",
        themeLabel: "Mode Gelap",
        btnDetail: "Lihat Info",
        btninfo: "segera",
        footerContact: "Customer Service",
        footerContactText: "Hubungi No WhatsApp",
        footerSupport: "Dukung Kreator",
        footerSupportText: "Dukung via SociaBuzz",
        footerSocial: "Tentang Saya",
        footerInfo: "Ingin Kuliner Anda Disini?",
        footerInfoText: "Promosikan cafe/resto Anda agar dilihat oleh ribuan cafe",
        tombol: "Daftar Toko / Pasang Iklan",
    },
    en: {
        searchPlaceholder: "Search foods...",
        heroTitle: "Cianjur Culinary",
        heroDesc: "The best & most popular dining places option.",
        btnNearest: "Find Nearest Culinary",
        themeLabel: "Dark Mode",
        btnDetail: "View Info",
        btninfo: "comingsoon",
        footerContact: "Customer Service",
        footerContactText: "Contact WhatsApp Number",
        footerSupport: "Support Creator",
        footerSupportText: "Support via SociaBuzz",
        footerSocial: "About Me",
        footerInfo: "Want Your Culinary Here?",
        footerInfoText: "Advertise your cafe/restaurant to reach thousands of users",
        tombol: "Register Store / Place Ads",
    }
};

let bahasaSekarang = localStorage.getItem('bahasa') || 'id';

function terapkanBahasa(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(elemen => {
        const kunci = elemen.getAttribute('data-lang-key');
        if (kamusBahasa[lang] && kamusBahasa[lang][kunci]) {
            if (elemen.tagName === 'INPUT') {
                elemen.placeholder = kamusBahasa[lang][kunci];
            } else {
                elemen.textContent = kamusBahasa[lang][kunci];
            }
        }
    });

    const tombolLang = document.getElementById('lang-toggle');
    if (tombolLang) {
        tombolLang.textContent = lang === 'id' ? 'ID' : 'EN';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    terapkanBahasa(bahasaSekarang);

    if (typeof cekStatusDetail === 'function') {
        cekStatusDetail();
    }

    const tombolLang = document.getElementById('lang-toggle');
    if (tombolLang) {
        tombolLang.addEventListener('click', () => {
            bahasaSekarang = bahasaSekarang === 'id' ? 'en' : 'id';
            localStorage.setItem('bahasa', bahasaSekarang);
            terapkanBahasa(bahasaSekarang);
            if (typeof cekStatusDetail === 'function') {
                cekStatusDetail();
            }
        });
    }
});