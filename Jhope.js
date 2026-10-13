
"use strict";

// =====================================================
// 🐿️ J-HOPE BIRTHDAY EXPERIENCE
// =====================================================

// 1. KONFIGURASI
// =====================================================

const JAWABAN_SANDI = [
    "j-hope",
    "jhope",
    "j hope",
    "jung hoseok",
    "hoseok",
    "jung ho seok"
];

const KLIK_ERROR = 3;
const LINK_NEXT = "https://htmlku.my.id/25M56";

// =====================================================
// 2. FUNGSI BANTU
// =====================================================

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ambilElemen(id) {
    return document.getElementById(id);
}

function tampilkanLayar(id) {
    document.querySelectorAll(".screen").forEach(layar => {
        layar.classList.remove("active");
        layar.classList.add("hidden");
    });

    const layarTujuan = ambilElemen(id);

    if (!layarTujuan) {
        console.error("Layar tidak ditemukan:", id);
        return false;
    }

    layarTujuan.classList.remove("hidden");
    layarTujuan.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return true;
}

// =====================================================
// 3. COUNTDOWN
// =====================================================

let timerCountdown = null;

function mulaiHitungMundur(id, mulai, selesai) {
    const elemenAngka = ambilElemen(id);

    if (!elemenAngka) {
        console.error("Countdown tidak ditemukan:", id);
        return;
    }

    if (timerCountdown !== null) {
        clearInterval(timerCountdown);
        timerCountdown = null;
    }

    let angka = mulai;
    elemenAngka.textContent = angka;

    elemenAngka.classList.remove("pulse");
    void elemenAngka.offsetWidth;
    elemenAngka.classList.add("pulse");

    timerCountdown = setInterval(() => {
        angka--;
        elemenAngka.textContent = angka;

        elemenAngka.classList.remove("pulse");
        void elemenAngka.offsetWidth;
        elemenAngka.classList.add("pulse");

        if (angka <= 0) {
            clearInterval(timerCountdown);
            timerCountdown = null;

            setTimeout(selesai, 500);
        }
    }, 1000);
}

// =====================================================
// 4. SANDI / TEKA-TEKI J-HOPE
// =====================================================

function pasangSistemSandi() {
    const tombol = ambilElemen("kirim-sandi");
    const input = ambilElemen("jawaban-sandi");
    const pesanSalah = ambilElemen("sandi-salah");

    if (!tombol || !input) {
        console.error("Elemen sandi tidak ditemukan.");
        return;
    }

    let sandiBerhasil = false;

    function periksaSandi(event) {
        if (event) event.preventDefault();
        if (sandiBerhasil) return;

        const jawaban = input.value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

        if (JAWABAN_SANDI.includes(jawaban)) {
            sandiBerhasil = true;
            tombol.disabled = true;
            input.disabled = true;

            if (pesanSalah) {
                pesanSalah.classList.add("hidden");
            }

            if (!tampilkanLayar("hitung-screen")) {
                sandiBerhasil = false;
                tombol.disabled = false;
                input.disabled = false;
                return;
            }

            mulaiHitungMundur("angka-hitung", 10, () => {
                tampilkanLayar("kue-screen");
            });

        } else {
            if (pesanSalah) {
                pesanSalah.textContent =
                    "Katanya ISTRI J-HOPE, masa nggak kenal 😝🐿️";

                pesanSalah.classList.remove("hidden");
            }

            input.value = "";
            input.focus();
        }
    }

    tombol.addEventListener("click", periksaSandi);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            periksaSandi(event);
        }
    });
}

// =====================================================
// 5. AMBIL KUE
// =====================================================

function pasangTombolKue() {
    const tombol = ambilElemen("ambil-kue");
    const gambarKue = ambilElemen("gambar-kue");

    if (!tombol) {
        console.error("Tombol ambil-kue tidak ditemukan.");
        return;
    }

    let sedangMemproses = false;

    tombol.addEventListener("click", async () => {
        if (sedangMemproses) return;

        sedangMemproses = true;
        tombol.disabled = true;

        if (gambarKue) {
            gambarKue.style.transition = "transform 0.6s ease";
            gambarKue.style.transform = "scale(1.1)";

            await wait(600);

            gambarKue.style.transform = "scale(1)";
        }

        await wait(300);

        const berhasil = tampilkanLayar("final-hitung-screen");

        if (!berhasil) {
            sedangMemproses = false;
            tombol.disabled = false;
            return;
        }

        mulaiHitungMundur("angka-final", 3, () => {
            if (tampilkanLayar("hujan-screen")) {
                mulaiHujanTeks();
            }
        });
    });
}

// =====================================================
// 6. HUJAN HAPPY BIRTHDAY
// =====================================================

async function mulaiHujanTeks() {
    const wadah = ambilElemen("wadah-hujan");
    const hati = ambilElemen("bentuk-hati");
    const tombolKado = ambilElemen("lanjut-kado");

    if (!wadah) {
        console.error("Wadah hujan tidak ditemukan.");
        return;
    }

    wadah.innerHTML = "";

    if (hati) {
        hati.textContent = "";
        hati.classList.remove("muncul");
        hati.classList.add("hidden");
    }

    if (tombolKado) {
        tombolKado.classList.remove("muncul");
        tombolKado.classList.add("hidden");
        tombolKado.disabled = true;
    }

    // A. HUJAN TEKS

    const jumlahHujan = 70;

    for (let i = 0; i < jumlahHujan; i++) {
        setTimeout(() => {
            const teks = document.createElement("span");

            teks.className = "teks-jatuh";
            teks.textContent = "HAPPY BIRTHDAY 🐿️";

            teks.style.left = Math.random() * 100 + "%";
            teks.style.animationDelay =
                Math.random() * 0.8 + "s";

            teks.style.fontSize =
                10 + Math.random() * 12 + "px";

            wadah.appendChild(teks);

            setTimeout(() => teks.remove(), 4500);
        }, i * 50);
    }

    await wait(4000);

    // B. MEMBENTUK HATI

    wadah.innerHTML = "";

    const jumlahLove = 160;

    for (let i = 0; i < jumlahLove; i++) {
        const t = (Math.PI * 2 * i) / jumlahLove;

        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        const teks = document.createElement("span");

        teks.className = "love-text";
        teks.textContent = "HAPPY BIRTHDAY";

        teks.style.left = 50 + x * 2.3 + "%";
        teks.style.top = 45 - y * 2.3 + "%";
        teks.style.animationDelay = i * 0.008 + "s";

        wadah.appendChild(teks);
    }

    await wait(2500);

    // C. TULISAN TENGAH

    if (hati) {
        hati.textContent = "HAPPY BIRTHDAY 🐿️🤎";
        hati.classList.remove("hidden");
        hati.classList.add("muncul");
    }

    await wait(1500);

    // D. TOMBOL KADO

    if (tombolKado) {
        tombolKado.disabled = false;
        tombolKado.classList.remove("hidden");
        tombolKado.classList.add("muncul");
    }
}

// =====================================================
// 7. MENUJU KADO
// =====================================================

function pasangTombolKado() {
    const tombol = ambilElemen("lanjut-kado");

    if (!tombol) {
        console.warn("Tombol lanjut-kado tidak ditemukan.");
        return;
    }

    tombol.addEventListener("click", () => {
        if (!tombol.disabled) {
            tampilkanLayar("kado-screen");
        }
    });
}

// =====================================================
// 8. ANIMASI MEMBUKA KADO
// =====================================================

function pasangAnimasiKado() {
    const gambar = ambilElemen("gambar-kado");

    if (!gambar) {
        console.error("Gambar kado tidak ditemukan.");
        return;
    }

    let kadoDibuka = false;

    gambar.addEventListener("click", async function () {
        if (kadoDibuka) return;
        kadoDibuka = true;

        this.style.transition =
            "transform 0.8s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.8s ease";

        this.style.transform = "scale(1.3) rotate(15deg)";

        await wait(250);

        this.style.transform = "scale(0) rotate(360deg)";
        this.style.opacity = "0";

        await wait(800);

        resetErrorScreen();

        if (!tampilkanLayar("error-screen")) {
            kadoDibuka = false;
            this.style.transform = "scale(1)";
            this.style.opacity = "1";
        }
    });
}

// =====================================================
// 9. SISTEM ERROR PALSU
// =====================================================

let sudahKlik = 0;
let errorSedangDiproses = false;

const pesanError = [
    "Klik untuk memperbaiki kejutan...",
    "ERROR masih terdeteksi. Coba lagi.",
    "Sistem semakin kacau. Klik sekali lagi.",
    "SYSTEM OVERRIDE..."
];

async function prosesKlikError() {
    const kotak = ambilElemen("kotak-error");
    const teks = ambilElemen("teks-error");
    const hitungan = ambilElemen("hitungan-klik");

    if (!kotak || errorSedangDiproses) return;
    if (sudahKlik >= KLIK_ERROR) return;

    errorSedangDiproses = true;
    sudahKlik++;

    if (hitungan) {
        hitungan.textContent = `${sudahKlik}/${KLIK_ERROR}`;
    }

    if (teks) {
        teks.textContent = pesanError[sudahKlik];
    }

    document.body.classList.add(`error-level-${sudahKlik}`);

    kotak.classList.remove("shake");
    void kotak.offsetWidth;
    kotak.classList.add("shake");

    if (sudahKlik < KLIK_ERROR) {
        await wait(300);
        errorSedangDiproses = false;
        return;
    }

    kotak.classList.add("beres");

    if (teks) {
        teks.textContent = "Kejutan berhasil dibuka... 🐿️🤎";
    }

    if (hitungan) {
        hitungan.textContent = "ACCESS GRANTED";
    }

    await wait(1500);

    document.body.classList.remove(
        "error-level-1",
        "error-level-2",
        "error-level-3"
    );

    tampilkanLayar("utama-screen");

    errorSedangDiproses = false;
}

function pasangSistemError() {
    const kotak = ambilElemen("kotak-error");

    if (!kotak) {
        console.warn("Kotak error tidak ditemukan.");
        return;
    }

    kotak.addEventListener("click", prosesKlikError);
}

function resetErrorScreen() {
    sudahKlik = 0;
    errorSedangDiproses = false;

    const teks = ambilElemen("teks-error");
    const hitungan = ambilElemen("hitungan-klik");
    const kotak = ambilElemen("kotak-error");

    if (teks) {
        teks.textContent = pesanError[0];
    }

    if (hitungan) {
        hitungan.textContent = `0/${KLIK_ERROR}`;
    }

    if (kotak) {
        kotak.classList.remove("beres", "shake");
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

function pasangTombolNext() {
    const tombol = ambilElemen("tombol-next");

    if (!tombol) {
        console.warn("Tombol Next tidak ditemukan.");
        return;
    }

    tombol.addEventListener("click", () => {
        window.location.href = LINK_NEXT;
    });
}

// =====================================================
// 11. MULAI WEBSITE
// =====================================================

function mulaiWebsite() {
    tampilkanLayar("sandi-screen");

    pasangSistemSandi();
    pasangTombolKue();
    pasangTombolKado();
    pasangAnimasiKado();
    pasangSistemError();
    pasangTombolNext();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        mulaiWebsite,
        { once: true }
    );
} else {
    mulaiWebsite();
}

