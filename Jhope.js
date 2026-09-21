// =====================================================
// 🐿 JHOPE BIRTHDAY EXPERIENCE
// =====================================================


// =====================================================
// KONFIGURASI
// =====================================================

const JAWABAN_SANDI = "j-hope;
const KLIK_ERROR = 3;


// =====================================================
// FUNGSI BANTU
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
    }
}


// =====================================================
// 1. SANDI / TEKA-TEKI
// =====================================================

const tombolSandi = document.getElementById("kirim-sandi");
const inputSandi = document.getElementById("jawaban-sandi");
const pesanSalah = document.getElementById("sandi-salah");


if (tombolSandi) {

    tombolSandi.addEventListener("click", () => {

        const jawab = inputSandi.value
            .trim()
            .toLowerCase();

        if (jawab === JAWABAN_SANDI) {

            // Sembunyikan pesan kesalahan
            pesanSalah.classList.add("hidden");

            // Lanjut ke countdown
            tampilkanLayar("hitung-screen");

            mulaiHitungMundur(
                "angka-hitung",
                10,
                () => {
                    tampilkanLayar("kue-screen");
                }
            );

        } else {

            // Jawaban salah
            pesanSalah.classList.remove("hidden");

            // Bersihkan input
            inputSandi.value = "";

            inputSandi.focus();

        }

    });

}


// Bisa menekan ENTER untuk mengirim jawaban

if (inputSandi) {

    inputSandi.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            tombolSandi.click();
        }

    });

}


// =====================================================
// 2. COUNTDOWN UMUM
// =====================================================

function mulaiHitungMundur(id, mulai, selesai) {

    let angka = mulai;

    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = angka;

    const timer = setInterval(() => {

        angka--;

        element.textContent = angka;

        // Efek kecil setiap angka berubah
        element.classList.remove("pulse");

        void element.offsetWidth;

        element.classList.add("pulse");


        if (angka <= 0) {

            clearInterval(timer);

            setTimeout(() => {
                selesai();
            }, 500);

        }

    }, 1000);

}


// =====================================================
// 3. KUE — TIUP LILIN
// =====================================================

const tombolTiup = document.getElementById("ambil kue");
const gambarKue = document.getElementById("gambar-kue");


if (tombolTiup) {

    tombolTiup.addEventListener("click", async () => {

        tombolTiup.disabled = true;

        // Efek kue
        if (gambarKue) {

            gambarKue.style.transition =
                "all 0.6s ease";

            gambarKue.style.transform =
                "scale(1.1)";

            gambarKue.style.filter =
                "brightness(1.4)";

        }

        await wait(600);


        // Kembalikan tampilan
        if (gambarKue) {

            gambarKue.style.transform =
                "scale(1)";

            gambarKue.style.filter =
                "none";

        }


        await wait(300);


        // Masuk countdown terakhir
        tampilkanLayar("final-hitung-screen");


        mulaiHitungMundur(
            "angka-final",
            3,
            () => {

                tampilkanLayar("hujan-screen");

                mulaiHujanTeks();

            }
        );

    });

}


// =====================================================
// 4. HUJAN HAPPY BIRTHDAY → MEMBENTUK LOVE
// =====================================================

async function mulaiHujanTeks() {

    const wadah =
        document.getElementById("wadah-hujan");

    const hati =
        document.getElementById("bentuk-hati");

    const tombol =
        document.getElementById("lanjut-kado");


    if (!wadah) return;


    wadah.innerHTML = "";


    // -----------------------------------------------
    // HUJAN TEKS
    // -----------------------------------------------

    const jumlah = 70;

    for (let i = 0; i < jumlah; i++) {

        setTimeout(() => {

            const teks =
                document.createElement("span");

            teks.className =
                "teks-jatuh";

            teks.textContent =
                "HAPPY BIRTHDAY";


            teks.style.left =
                Math.random() * 100 + "%";


            teks.style.animationDelay =
                Math.random() * 0.8 + "s";


            teks.style.fontSize =
                (10 + Math.random() * 12) + "px";


            wadah.appendChild(teks);


            setTimeout(() => {
                teks.remove();
            }, 4000);

        }, i * 50);

    }


    // Tunggu hujan
    await wait(4000);


    // -----------------------------------------------
    // BENTUK LOVE
    // -----------------------------------------------

    if (wadah) {

        wadah.innerHTML = "";

        const jumlahLove = 160;

        for (let i = 0; i < jumlahLove; i++) {

            const t =
                (Math.PI * 2 * i) / jumlahLove;

            /*
             * Rumus parametrik LOVE
             *
             * x = 16 sin³(t)
             * y = 13 cos(t)
             *     - 5 cos(2t)
             *     - 2 cos(3t)
             *     - cos(4t)
             */

            const x =
                16 *
                Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t);


            const teks =
                document.createElement("span");

            teks.className =
                "love-text";

            teks.textContent =
                "HAPPY BIRTHDAY";


            const posX =
                50 + x * 2.3;

            const posY =
                45 - y * 2.3;


            teks.style.left =
                posX + "%";

            teks.style.top =
                posY + "%";


            teks.style.animationDelay =
                (i * 0.008) + "s";


            wadah.appendChild(teks);

        }

    }


    // -----------------------------------------------
    // TUNGGU LOVE TERBENTUK
    // -----------------------------------------------

    await wait(2500);


    // -----------------------------------------------
    // TAMPILKAN TULISAN TENGAH
    // -----------------------------------------------

    if (hati) {

        hati.textContent =
            "HAPPY BIRTHDAY";

        hati.classList.remove("hidden");

        hati.classList.add("muncul");

    }


    await wait(1500);


    // -----------------------------------------------
    // LANJUT KE KADO
    // -----------------------------------------------

    if (tombol) {

        tombol.classList.remove("hidden");

        tombol.classList.add("muncul");

    }

}


// =====================================================
// 5. LANJUT KE KADO
// =====================================================

const tombolKado =
    document.getElementById("lanjut-kado");


if (tombolKado) {

    tombolKado.addEventListener("click", () => {

        tampilkanLayar("kado-screen");

    });

}


// =====================================================
// 6. KADO — BUKA
// =====================================================

const gambarKado =
    document.getElementById("gambar-kado");


if (gambarKado) {

    gambarKado.addEventListener(
        "click",
        async function () {

            this.style.transition =
                "all 0.8s cubic-bezier(.68,-0.55,.27,1.55)";

            this.style.transform =
                "scale(1.3) rotate(15deg)";


            await wait(250);


            this.style.transform =
                "scale(0) rotate(360deg)";

            this.style.opacity =
                "0";


            await wait(800);


            // Reset click error
            sudahKlik = 0;

            const counter =
                document.getElementById("hitungan-klik");

            if (counter) {
                counter.textContent =
                    `0/${KLIK_ERROR}`;
            }


            // Masuk ERROR
            tampilkanLayar("error-screen");


            // Reset tampilan error
            resetErrorScreen();

        }
    );

}


// =====================================================
// 7. ERROR SYSTEM
// =====================================================

let sudahKlik = 0;

const kotakError =
    document.getElementById("kotak-error");

const teksError =
    document.getElementById("teks-error");

const hitunganKlik =
    document.getElementById("hitungan-klik");


const pesanError = [

    "Klik untuk memperbaiki...",

    "ERROR masih terdeteksi. Coba lagi.",

    "Sistem semakin kacau. Klik sekali lagi.",

    "SYSTEM OVERRIDE..."

];


if (kotakError) {

    kotakError.addEventListener(
        "click",
        async () => {

            // Jangan tambah setelah selesai
            if (sudahKlik >= KLIK_ERROR) {
                return;
            }


            sudahKlik++;


            // Update counter
            if (hitunganKlik) {

                hitunganKlik.textContent =
                    `${sudahKlik}/${KLIK_ERROR}`;

            }


            // Pesan berubah
            if (teksError) {

                teksError.textContent =
                    pesanError[sudahKlik];

            }


            // Efek semakin kacau
            document.body.classList.add(
                `error-level-${sudahKlik}`
            );


            kotakError.classList.remove("shake");

            void kotakError.offsetWidth;

            kotakError.classList.add("shake");


            // Kalau belum 3 klik
            if (sudahKlik < KLIK_ERROR) {

                return;

            }


            // =================================================
            // ERROR BERHASIL DIPECAHKAN
            // =================================================

            kotakError.classList.add("beres");


            if (teksError) {
                teksError.textContent =
                    "Kejutan berhasil dibuka...";
            }


            if (hitunganKlik) {
                hitunganKlik.textContent =
                    "ACCESS GRANTED";
            }


            await wait(1500);


            // Hapus efek error
            document.body.classList.remove(
                "error-level-1",
                "error-level-2",
                "error-level-3"
            );


            // Masuk halaman utama
            tampilkanLayar("utama-screen");

        }
    );

}


// =====================================================
// RESET ERROR
// =====================================================

function resetErrorScreen() {

    sudahKlik = 0;


    if (teksError) {

        teksError.textContent =
            pesanError[0];

    }


    if (hitunganKlik) {

        hitunganKlik.textContent =
            `0/${KLIK_ERROR}`;

    }


    if (kotakError) {

        kotakError.classList.remove(
            "beres",
            "shake"
        );

    }


    document.body.classList.remove(
        "error-level-1",
        "error-level-2",
        "error-level-3"
    );

}


// =====================================================
// 8. TOMBOL NEXT
// =====================================================

const tombolNext = document.getElementById("tombol-next");

if (tombolNext) {
    tombolNext.addEventListener("click", () => {
        window.location.href = "https://htmlku.my.id/xmOgm";
    });
}


// =====================================================
// 9. PROTEKSI AGAR SCREEN AWAL BENAR
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        tampilkanLayar("sandi-screen");

    }
);
