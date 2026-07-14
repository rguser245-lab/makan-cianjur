const kamusDetail = {
    id: {
        themeLabel: "Mode Gelap",
        hari: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
        judul: "Tentang",
        descDepdoo: "Tempat nongkrong kekinian di Cianjur dengan berbagai varian menu kuliner lezat, mulai dari camilan ringan hingga makanan berat dengan cita rasa khas yang pas di kantong mahasiswa maupun keluarga.",
        titleMenu: "Menu Unggulan ",
        pizzaDesc: "Pizza tipis renyah dengan lelehan keju mozzarella premium dan saus bolognese gurih.",
        ricebowlDesc: "Nasi hangat dengan potongan ayam krispi saus padang pedas manis ditambah telur mata sapi.",
        coffeeDesc: "Perpaduan espresso premium dengan susu segar murni dan sirup gula aren asli.",
        titleOrderOnline: "Order Online Via Applications:",
        btnBack: "Kembali ke Beranda",
        btnCheckIg: "Cek Instagram",
        footerContact: "Customer Service",
        footerSupport: "Dukung Kreator",
        footerSocial: "Tentang Saya"
    },
    en: {
        themeLabel: "Dark Mode",
        hari: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        judul: "about",
        descDepdoo: "A trendy hangout spot in Cianjur serving various delicious culinary menus, from light snacks to heavy meals with distinctive flavors that fit perfectly in the pockets of students and families.",
        titleMenu: "Featured Menu ",
        pizzaDesc: "Crispy thin pizza topped with premium melted mozzarella cheese and savory bolognese sauce.",
        ricebowlDesc: "Warm rice with crispy chicken pieces covered in sweet-spicy Padang sauce, topped with a sunny-side-up egg.",
        coffeeDesc: "Premium espresso mixed with creamy milk and pure palm sugar syrup.",
        titleOrderOnline: "Order Online Via Applications:",
        btnBack: "Back to Home",
        btnCheckIg: "Check Instagram",
        footerContact: "Customer Service",
        footerSupport: "Support Creator",
        footerSocial: "About Me"
    }
};

let bahasaDetail = localStorage.getItem('bahasa') || 'id';

function terapkanBahasaDetail(lang) {
    // 1. Menerjemahkan elemen teks biasa dengan data-lang-key
    document.querySelectorAll('[data-lang-key]').forEach(elemen => {
        const kunci = elemen.getAttribute('data-lang-key');
        if (kamusDetail[lang] && kamusDetail[lang][kunci]) {
            elemen.textContent = kamusDetail[lang][kunci];
        }
    });

    // 2. TAMBAHAN: Menerjemahkan array hari berdasarkan atribut data-hari di HTML
    const listHari = document.querySelectorAll('.jadwal-list li');
    listHari.forEach(li => {
        const indexHari = li.getAttribute('data-hari');
        if (indexHari !== null) {
            const spanHari = li.querySelector('.hari');
            // Ambil nama hari dari array kamusDetail[lang].hari sesuai angka indeksnya
            if (spanHari && kamusDetail[lang] && kamusDetail[lang].hari) {
                spanHari.textContent = kamusDetail[lang].hari[parseInt(indexHari)];
            }
        }
    });

    // 3. Mengubah teks tombol toggle bahasa
    const tombolLang = document.getElementById('lang-toggle');
    if (tombolLang) {
        tombolLang.textContent = lang === 'id' ? 'ID' : 'EN';
    }
    
    // 4. Update status buka/tutup jam operasional secara real-time
    cekStatusDetail();
}

document.addEventListener('DOMContentLoaded', () => {
    terapkanBahasaDetail(bahasaDetail);

    const tombolLang = document.getElementById('lang-toggle');
    if (tombolLang) {
        tombolLang.addEventListener('click', () => {
            bahasaDetail = bahasaDetail === 'id' ? 'en' : 'id';
            localStorage.setItem('bahasa', bahasaDetail);
            terapkanBahasaDetail(bahasaDetail);
        });
    }
});