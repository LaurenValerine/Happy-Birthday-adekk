
"use strict";

// =====================================================
// 🐸 FROG BIRTHDAY EXPERIENCE
// =====================================================

// 1. KONFIGURASI
// =====================================================

const JAWABAN_SANDI = "katak";
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

    return true;
}

// =====================================================
// 3. COUNTDOWN UMUM
// =====================================================

let timerCountdown = null;

function mulaiHitungMundur(id, mulai, selesai) {
    const elemenAngka = ambilElemen(id);

    if (!elemenAngka) {
        console.error("Elemen countdown tidak ditemukan:", id);
        return;
    }

    // Mencegah countdown lama berjalan bersamaan.
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

            setTimeout(() => {
                selesai();
            }, 500);
        }
    }, 1000);
}

// =====================================================
// 4. SANDI / TEKA-TEKI
// =====================================================

function pasangSistemSandi() {
    const tombolSandi = ambilElemen("kirim-sandi");
    const inputSandi = ambilElemen("jawaban-sandi");
    const pesanSalah = ambilElemen("sandi-salah");

    if (!tombolSandi || !inputSandi) {
        console.error(
            "Elemen sandi tidak ditemukan. Periksa ID HTML."
        );
        return;
    }

    let sandiBerhasil = false;

    function periksaSandi(event) {
        if (event) {
            event.preventDefault();
        }

        // Mencegah countdown dimulai berkali-kali.
        if (sandiBerhasil) return;

        const jawaban = inputSandi.value
            .trim()
            .toLowerCase();

        if (jawaban === JAWABAN_SANDI) {
            sandiBerhasil = true;
            tombolSandi.disabled = true;

            if (pesanSalah) {
                pesanSalah.textContent = "";
                pesanSalah.classList.add("hidden");
            }

            inputSandi.disabled = true;

            const berhasil = tampilkanLayar("hitung-screen");

            if (!berhasil) {
                sandiBerhasil = false;
                tombolSandi.disabled = false;
                inputSandi.disabled = false;
                return;
            }

            mulaiHitungMundur(
                "angka-hitung",
                10,
                () => {
                    tampilkanLayar("kue-screen");
                }
            );

        } else {
            if (pesanSalah) {
                pesanSalah.textContent =
                    "Katanya Ratu KATAK, masa gatauu 😝";

                pesanSalah.classList.remove("hidden");
            }

            inputSandi.value = "";
            inputSandi.focus();
        }
    }

    tombolSandi.addEventListener("click", periksaSandi);

    inputSandi.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            periksaSandi(event);
        }
    });
}

// =====================================================
// 5. KUE / TIUP LILIN
// =====================================================

function pasangTombolTiup() {
    const tombolTiup = ambilElemen("tiup-lilin");
    const gambarKue = ambilElemen("gambar-kue");

    if (!tombolTiup) {
        console.warn("Tombol tiup-lilin tidak ditemukan.");
        return;
    }

    let sedangMemproses = false;

    tombolTiup.addEventListener("click", async () => {
        if (sedangMemproses) return;
        sedangMemproses = true;

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

        const berhasil = tampilkanLayar("final-hitung-screen");

        if (!berhasil) {
            sedangMemproses = false;
            tombolTiup.disabled = false;
            return;
        }

        mulaiHitungMundur("angka-final", 3, () => {
            const pindah = tampilkanLayar("hujan-screen");

            if (pindah) {
                mulaiHujanTeks();
            }
        });
    });
}

// =====================================================
// 6. HUJAN TEKS HAPPY BIRTHDAY
// =====================================================

async function mulaiHujanTeks() {
    const wadah = ambilElemen("wadah-hujan");
    const hati = ambilElemen("bentuk-hati");
    const tombolKado = ambilElemen("lanjut-kado");

    if (!wadah) {
        console.error("Elemen wadah-hujan tidak ditemukan.");
        return;
    }

    // Reset tampilan agar animasi tidak menumpuk.
    wadah.innerHTML = "";

    if (hati) {
        hati.textContent = "";
        hati.classList.remove("muncul");
        hati.classList.add("hidden");
    }

    if (tombolKado) {
        tombolKado.classList.remove("muncul");
        tombolKado.classList.add("hidden");
    }

    // -------------------------------------------------
    // A. HUJAN TEKS
    // -------------------------------------------------

    const jumlahHujan = 70;

    for (let i = 0; i < jumlahHujan; i++) {
        setTimeout(() => {
            const teks = document.createElement("span");

            teks.className = "teks-jatuh";
            teks.textContent = "HAPPY BIRTHDAY";

            teks.style.left = Math.random() * 100 + "%";
            teks.style.animationDelay =
                Math.random() * 0.8 + "s";

            teks.style.fontSize =
                (10 + Math.random() * 12) + "px";

            wadah.appendChild(teks);

            setTimeout(() => {
                teks.remove();
            }, 4500);
        }, i * 50);
    }

    await wait(4000);

    // -------------------------------------------------
    // B. MEMBENTUK HATI DARI TEKS
    // -------------------------------------------------

    wadah.innerHTML = "";

    const jumlahLove = 160;

    for (let i = 0; i < jumlahLove; i++) {
        const t = (Math.PI * 2 * i) / jumlahLove;

        // Rumus parametrik bentuk hati.
        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        const teks = document.createElement("span");

        teks.className = "love-text";
        teks.textContent = "HAPPY BIRTHDAY";

        const posX = 50 + x * 2.3;
        const posY = 45 - y * 2.3;

        teks.style.left = posX + "%";
        teks.style.top = posY + "%";
        teks.style.animationDelay = (i * 0.008) + "s";

        wadah.appendChild(teks);
    }

    await wait(2500);

    // -------------------------------------------------
    // C. TULISAN TENGAH
    // -------------------------------------------------

    if (hati) {
        hati.textContent = "HAPPY BIRTHDAY";
        hati.classList.remove("hidden");
        hati.classList.add("muncul");
    }

    await wait(1500);

    // -------------------------------------------------
    // D. TOMBOL MENUJU KADO
    // -------------------------------------------------

    if (tombolKado) {
        tombolKado.classList.remove("hidden");
        tombolKado.classList.add("muncul");
    }
}

// =====================================================
// 7. TOMBOL LANJUT KE KADO
// =====================================================

function pasangTombolKado() {
    const tombolKado = ambilElemen("lanjut-kado");

    if (!tombolKado) {
        console.warn("Tombol lanjut-kado tidak ditemukan.");
        return;
    }

    tombolKado.addEventListener("click", () => {
        tampilkanLayar("kado-screen");
    });
}

// =====================================================
// 8. ANIMASI MEMBUKA KADO
// =====================================================

function pasangAnimasiKado() {
    const gambarKado = ambilElemen("gambar-kado");

    if (!gambarKado) {
        console.warn("Elemen gambar-kado tidak ditemukan.");
        return;
    }

    let kadoDibuka = false;

    gambarKado.addEventListener("click", async function () {
        if (kadoDibuka) return;
        kadoDibuka = true;

        this.style.transition =
            "all 0.8s cubic-bezier(.68,-0.55,.27,1.55)";

        this.style.transform = "scale(1.3) rotate(15deg)";

        await wait(250);

        this.style.transform = "scale(0) rotate(360deg)";
        this.style.opacity = "0";

        await wait(800);

        resetErrorScreen();

        const berhasil = tampilkanLayar("error-screen");

        if (!berhasil) {
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
    "Klik untuk memperbaiki...",
    "ERROR masih terdeteksi. Coba lagi.",
    "Sistem semakin kacau. Klik sekali lagi.",
    "SYSTEM OVERRIDE..."
];

async function prosesKlikError() {
    const kotakError = ambilElemen("kotak-error");
    const teksError = ambilElemen("teks-error");
    const hitunganKlik = ambilElemen("hitungan-klik");

    if (!kotakError || errorSedangDiproses) return;

    if (sudahKlik >= KLIK_ERROR) return;

    errorSedangDiproses = true;
    sudahKlik++;

    if (hitunganKlik) {
        hitunganKlik.textContent =
            `${sudahKlik}/${KLIK_ERROR}`;
    }

    if (teksError) {
        teksError.textContent = pesanError[sudahKlik];
    }

    document.body.classList.add(
        `error-level-${sudahKlik}`
    );

    kotakError.classList.remove("shake");
    void kotakError.offsetWidth;
    kotakError.classList.add("shake");

    if (sudahKlik < KLIK_ERROR) {
        await wait(250);
        errorSedangDiproses = false;
        return;
    }

    // ERROR BERHASIL DIPECAHKAN.

    kotakError.classList.add("beres");

    if (teksError) {
        teksError.textContent =
            "Kejutan berhasil dibuka...";
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

    errorSedangDiproses = false;
}

function pasangSistemError() {
    const kotakError = ambilElemen("kotak-error");

    if (!kotakError) {
        console.warn("Elemen kotak-error tidak ditemukan.");
        return;
    }

    kotakError.addEventListener("click", prosesKlikError);
}

function resetErrorScreen() {
    sudahKlik = 0;
    errorSedangDiproses = false;

    const teksError = ambilElemen("teks-error");
    const hitunganKlik = ambilElemen("hitungan-klik");
    const kotakError = ambilElemen("kotak-error");

    if (teksError) {
        teksError.textContent = pesanError[0];
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

function pasangTombolNext() {
    const tombolNext = ambilElemen("tombol-next");

    if (!tombolNext) {
        console.warn("Tombol tombol-next tidak ditemukan.");
        return;
    }

    tombolNext.addEventListener("click", () => {
        window.location.href = LINK_NEXT;
    });
}

// =====================================================
// 11. MULAI WEBSITE
// =====================================================

function mulaiWebsite() {
    // Tampilkan layar sandi saat website dibuka.
    tampilkanLayar("sandi-screen");

    // Pasang seluruh event.
    pasangSistemSandi();
    pasangTombolTiup();
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
 
