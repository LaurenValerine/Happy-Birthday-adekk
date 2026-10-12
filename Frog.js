
"use strict";

// =====================================================
// 🐸 FROG BIRTHDAY EXPERIENCE
// JAVASCRIPT UTAMA
// =====================================================


// =====================================================
// 1. KONFIGURASI
// =====================================================

const JAWABAN_SANDI = "katak";
const KLIK_ERROR = 3;


// =====================================================
// 2. FUNGSI BANTU
// =====================================================

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function tampilkanLayar(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
        screen.classList.add("hidden");
    });

    const layar = document.getElementById(id);

    if (layar) {
        layar.classList.remove("hidden");
        layar.classList.add("active");
    } else {
        console.error("Layar tidak ditemukan:", id);
    }
}


// =====================================================
// 3. COUNTDOWN
// =====================================================

function mulaiHitungMundur(id, mulai, selesai) {
    const element = document.getElementById(id);

    if (!element) {
        console.error("Elemen countdown tidak ditemukan:", id);
        return;
    }

    let angka = mulai;

    element.textContent = angka;

    const timer = setInterval(() => {
        angka--;

        element.textContent = angka;

        element.classList.remove("pulse");
        void element.offsetWidth;
        element.classList.add("pulse");

        if (angka <= 0) {
            clearInterval(timer);

            setTimeout(() => {
                if (typeof selesai === "function") {
                    selesai();
                }
            }, 500);
        }
    }, 1000);
}


// =====================================================
// 4. SANDI
// =====================================================

function aturSandi() {
    const tombolSandi = document.getElementById("kirim-sandi");
    const inputSandi = document.getElementById("jawaban-sandi");
    const pesanSalah = document.getElementById("sandi-salah");

    if (!tombolSandi || !inputSandi || !pesanSalah) {
        console.error("Elemen sandi tidak lengkap.");
        return;
    }

    function periksaSandi() {
        const jawab = inputSandi.value.trim().toLowerCase();

        // Kata "katak" boleh berada di mana saja.
        if (jawab.includes(JAWABAN_SANDI)) {
            pesanSalah.classList.add("hidden");

            tampilkanLayar("hitung-screen");

            mulaiHitungMundur("angka-hitung", 10, () => {
                tampilkanLayar("kue-screen");
            });
        } else {
            pesanSalah.classList.remove("hidden");

            inputSandi.value = "";
            inputSandi.focus();
        }
    }

    tombolSandi.addEventListener("click", periksaSandi);

    inputSandi.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            periksaSandi();
        }
    });
}


// =====================================================
// 5. KUE DAN TIUP LILIN
// =====================================================

function aturKue() {
    const tombolTiup = document.getElementById("tiup-lilin");
    const gambarKue = document.getElementById("gambar-kue");

    if (!tombolTiup) {
        console.error("Tombol tiup lilin tidak ditemukan.");
        return;
    }

    tombolTiup.addEventListener("click", async () => {
        tombolTiup.disabled = true;

        if (gambarKue) {
            gambarKue.style.transition = "all 0.6s ease";
            gambarKue.style.transform = "scale(1.1)";
            gambarKue.style.filter = "brightness(1.4)";
        }

        await wait(600);

        if (gambarKue) {
            gambarKue.style.transform = "scale(1)";
            gambarKue.style.filter = "none";
        }

        await wait(300);

        tampilkanLayar("final-hitung-screen");

        mulaiHitungMundur("angka-final", 3, () => {
            tampilkanLayar("hujan-screen");
            mulaiHujanTeks();
        });
    });
}


// =====================================================
// 6. HUJAN HAPPY BIRTHDAY DAN BENTUK LOVE
// =====================================================

async function mulaiHujanTeks() {
    const wadah = document.getElementById("wadah-hujan");
    const hati = document.getElementById("bentuk-hati");
    const tombol = document.getElementById("lanjut-kado");

    if (!wadah) {
        console.error("Wadah hujan tidak ditemukan.");
        return;
    }

    wadah.innerHTML = "";

    if (hati) {
        hati.classList.add("hidden");
        hati.classList.remove("muncul");
    }

    if (tombol) {
        tombol.classList.add("hidden");
        tombol.classList.remove("muncul");
    }

    // Hujan teks ulang tahun
    const kata = [
        "HAPPY BIRTHDAY",
        "SELAMAT ULANG TAHUN",
        "🐸 HAPPY BIRTHDAY 🐸",
        "WISH YOU ALL THE BEST"
    ];

    for (let i = 0; i < 45; i++) {
        const teks = document.createElement("span");

        teks.className = "teks-jatuh";
        teks.textContent = kata[i % kata.length];

        teks.style.left = Math.random() * 90 + "%";
        teks.style.animationDelay = Math.random() * 2 + "s";
        teks.style.animationDuration = 3 + Math.random() * 3 + "s";

        wadah.appendChild(teks);
    }

    await wait(5000);

    // Bersihkan hujan sebelum membentuk love
    wadah.innerHTML = "";

    // Membentuk love menggunakan teks HAPPY BIRTHDAY
    const jumlahLove = 160;

    for (let i = 0; i < jumlahLove; i++) {
        const t = (Math.PI * 2 * i) / jumlahLove;

        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        const teks = document.createElement("span");

        teks.className = "love-text";
        teks.textContent = "HAPPY BIRTHDAY";

        teks.style.left = (50 + x * 2.3) + "%";
        teks.style.top = (45 - y * 2.3) + "%";
        teks.style.animationDelay = (i * 0.008) + "s";

        wadah.appendChild(teks);
    }

    await wait(2500);

    if (hati) {
        hati.textContent = "HAPPY BIRTHDAY";
        hati.classList.remove("hidden");
        hati.classList.add("muncul");
    }

    await wait(1500);

    if (tombol) {
        tombol.classList.remove("hidden");
        tombol.classList.add("muncul");
    }
}


// =====================================================
// 7. LANJUT KE KADO
// =====================================================

function aturTombolKado() {
    const tombol = document.getElementById("lanjut-kado");

    if (tombol) {
        tombol.addEventListener("click", () => {
            tampilkanLayar("kado-screen");
        });
    }
}


// =====================================================
// 8. KADO
// =====================================================

let sudahKlik = 0;

function aturKado() {
    const gambarKado = document.getElementById("gambar-kado");

    if (!gambarKado) {
        console.error("Gambar kado tidak ditemukan.");
        return;
    }

    gambarKado.addEventListener("click", async function () {
        this.style.transition =
            "all 0.8s cubic-bezier(.68,-0.55,.27,1.55)";

        this.style.transform = "scale(1.3) rotate(15deg)";

        await wait(250);

        this.style.transform = "scale(0) rotate(360deg)";
        this.style.opacity = "0";

        await wait(800);

        resetErrorScreen();

        tampilkanLayar("error-screen");
    });
}


// =====================================================
// 9. SISTEM ERROR
// =====================================================

function aturError() {
    const kotakError = document.getElementById("kotak-error");
    const teksError = document.getElementById("teks-error");
    const hitunganKlik = document.getElementById("hitungan-klik");

    const pesanError = [
        "Klik untuk memperbaiki...",
        "ERROR masih terdeteksi. Coba lagi.",
        "Sistem semakin kacau. Klik sekali lagi.",
        "SYSTEM OVERRIDE..."
    ];

    if (!kotakError) {
        console.error("Kotak error tidak ditemukan.");
        return;
    }

    kotakError.addEventListener("click", async () => {
        if (sudahKlik >= KLIK_ERROR) {
            return;
        }

        sudahKlik++;

        if (hitunganKlik) {
            hitunganKlik.textContent = `${sudahKlik}/${KLIK_ERROR}`;
        }

        if (teksError) {
            teksError.textContent = pesanError[sudahKlik];
        }

        document.body.classList.add(`error-level-${sudahKlik}`);

        kotakError.classList.remove("shake");
        void kotakError.offsetWidth;
        kotakError.classList.add("shake");

        if (sudahKlik < KLIK_ERROR) {
            return;
        }

        kotakError.classList.add("beres");

        if (teksError) {
            teksError.textContent = "Kejutan berhasil dibuka...";
        }

        if (hitunganKlik) {
            hitunganKlik.textContent = "ACCESS GRANTED";
        }

        await wait(1500);

        document.body.classList.remove(
            "error-level-1",
            "error-level-2",
            "error-level-3"
        );

        tampilkanLayar("utama-screen");
    });
}


function resetErrorScreen() {
    sudahKlik = 0;

    const teksError = document.getElementById("teks-error");
    const hitunganKlik = document.getElementById("hitungan-klik");
    const kotakError = document.getElementById("kotak-error");

    if (teksError) {
        teksError.textContent = "Klik untuk memperbaiki...";
    }

    if (hitunganKlik) {
        hitunganKlik.textContent = `0/${KLIK_ERROR}`;
    }

    if (kotakError) {
        kotakError.classList.remove("beres", "shake");
    }

    document.body.classList.remove(
        "error-level-1",
        "error-level-2",
        "error-level-3"
    );
}


// =====================================================
// 10. TOMBOL NEXT
// =====================================================

function aturTombolNext() {
    const tombolNext = document.getElementById("tombol-next");

    if (tombolNext) {
        tombolNext.addEventListener("click", () => {
            window.location.href = "https://htmlku.my.id/25M56";
        });
    }
}


// =====================================================
// 11. MULAI WEBSITE
// =====================================================

function mulaiWebsite() {
    aturSandi();
    aturKue();
    aturTombolKado();
    aturKado();
    aturError();
    aturTombolNext();

    tampilkanLayar("sandi-screen");

    console.log("🐸 Frog Birthday Experience siap dijalankan!");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulaiWebsite);
} else {
    mulaiWebsite();
             }
