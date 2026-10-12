// =====================================================
// 🐸 FROG BIRTHDAY EXPERIENCE
// =====================================================

// =====================================================
// KONFIGURASI
// =====================================================

const JAWABAN_SANDI = "Katak";
const KLIK_ERROR = 3;

// =====================================================
// FUNGSI BANTU
// =====================================================

 function tampilkanLayar(id) {

    document.querySelectorAll(".screen").forEach(function (layar) {
        layar.classList.remove("active");
        layar.classList.add("hidden");
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
// 1. SANDI / TEKA-TEKI
// =====================================================

const JAWABAN_SANDI = "katak";

const tombolSandi = document.getElementById("kirim-sandi");
const inputSandi = document.getElementById("jawaban-sandi");
const pesanSalah = document.getElementById("sandi-salah");

if (tombolSandi && inputSandi) {

    tombolSandi.addEventListener("click", function (event) {
        event.preventDefault();

        const jawab = inputSandi.value.trim().toLowerCase();

        if (jawab === JAWABAN_SANDI) {

            if (pesanSalah) {
                pesanSalah.classList.add("hidden");
            }

            tampilkanLayar("hitung-screen");

            mulaiHitungMundur(
                "angka-hitung",
                10,
                function () {
                    tampilkanLayar("kue-screen");
                }
            );

        } else {

            if (pesanSalah) {
                pesanSalah.classList.remove("hidden");
                pesanSalah.textContent = "Katanya Ratu KATAK Masa Gatauu😝";
            }

            inputSandi.value = "";
            inputSandi.focus();

        }
    });

    inputSandi.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tombolSandi.click();
        }
    });

}

// =====================================================
// 2. COUNTDOWN UMUM
// =====================================================

function mulaiHitungMundur(id, mulai, selesai) {

Let angka = mulai;  

const element = document.getElementById(id);  

if (!element) return;  

Element.textContent = angka;  

const timer = setInterval(() => {  

    Angka--;  

    Element.textContent = angka;  

    // Efek kecil setiap angka berubah  
    Element.classList.remove("pulse");  

    Void element.offsetWidth;  

    Element.classList.add("pulse");  


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

const tombolTiup = document.getElementById("tiup-lili");
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

Async function mulaiHujanTeks() {

const wadah =  
    document.getElementById("wadah-hujan");  

const hati =  
    document.getElementById("bentuk-hati");  

const tombol =  
    document.getElementById("lanjut-kado");  


if (!wadah) return;  


Wadah.innerHTML = "";  



    // -----------------------------------------------
    // HUJAN TEKS
    // -----------------------------------------------

    const jumlah = 70;

    For (let i = 0; i < jumlah; i++) {

        setTimeout(() => {

            const teks =
                document.createElement("span");

            teks.className =
                “teks-jatuh”;

            teks.textContent =
                "HAPPY BIRTHDAY";

            teks.style.left =
                Math.random() * 100 + "%";

            teks.style.animationDelay =
                Math.random() * 0.8 + "s";

            teks.style.fontSize =
                (10 + Math.random() * 12) + "px";

            Wadah.appendChild(teks);

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

    Wadah.innerHTML = "";  

    const jumlahLove = 160;  

    For (let i = 0; i < jumlahLove; i++) {  

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
            45 – y * 2.3;  


        teks.style.left =  
            posX + "%";  

        teks.style.top =  
            posY + "%";  


        teks.style.animationDelay =  
            (i * 0.008) + "s";  


        Wadah.appendChild(teks);  

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

    Hati.textContent =  
        "HAPPY BIRTHDAY";  

    Hati.classList.remove("hidden");  

    Hati.classList.add("muncul");  

}  


await wait(1500);  


// -----------------------------------------------  
// LANJUT KE KADO  
// -----------------------------------------------  

if (tombol) {  

    Tombol.classList.remove("hidden");  

    Tombol.classList.add("muncul");  

}

}

// =====================================================
// 5. LANJUT KE KADO
// =====================================================

const tombolKado =
document.getElementById("lanjut-kado");

uf (tombolKado) {

tombolKado.addEventListener("click", () => {  

    tampilkanLayar("kado-screen");  

});

}

// =====================================================
// 6. KADO — BUKA
// =====================================================

const gambarKado =
document.getElementById(“gambar-kado”);

If (gambarKado) {

gambarKado.addEventListener(  
    "click",  
    Async function () {  

        This.style.transition =  
            "all 0.8s cubic-bezier(.68,-0.55,.27,1.55)";  

        This.style.transform =  
            "scale(1.3) rotate(15deg)";  


        await wait(250);  


        this.style.transform =  
            "scale(0) rotate(360deg)";  

        this.style.opacity =  
            "0";  


        Await wait(800);  


        // Reset click error  
        sudahKlik = 0;  

        const counter =  
            document.getElementById("hitungan-klik");  

        if (counter) {  
            counter.textContent =  
                `0/${KLIK_ERROR}`;  
        }  


        // Masuk ERROR  
        tampilkanLayar(“error-screen”);  


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

Const pesanError = [

“Klik untuk memperbaiki...”,  

“ERROR masih terdeteksi. Coba lagi.”,  

“Sistem semakin kacau. Klik sekali lagi.”,  

“SYSTEM OVERRIDE...”

];

If (kotakError) {

kotakError.addEventListener(  
    “click”,  
    Async () => {  

        // Jangan tambah setelah selesai  
        If (sudahKlik >= KLIK_ERROR) {  
            Return;  
        }  


        sudahKlik++;  


        // Update counter  
        If (hitunganKlik) {  

            hitunganKlik.textContent =  
                `${sudahKlik}/${KLIK_ERROR}`;  

        }  


        // Pesan berubah  
        If (teksError) {  

            teksError.textContent =  
                pesanError[sudahKlik];  

        }  


        // Efek semakin kacau  
        Document.body.classList.add(  
            `error-level-${sudahKlik}`  
        );  


        kotakError.classList.remove(“shake”);  

        void kotakError.offsetWidth;  

        kotakError.classList.add(“shake”);  


        // Kalau belum 3 klik  
        If (sudahKlik < KLIK_ERROR) {  

            Return;  

        }  


        // =================================================  
        // ERROR BERHASIL DIPECAHKAN  
        // =================================================  

        kotakError.classList.add(“beres”);  


        if (teksError) {  
            teksError.textContent =  
                “Kejutan berhasil dibuka...”;  
        }  


        If (hitunganKlik) {  
            hitunganKlik.textContent =  
                “ACCESS GRANTED”;  
        }  


        Await wait(1500);  


        // Hapus efek error  
        Document.body.classList.remove(  
            “error-level-1”,  
            “error-level-2”,  
            “error-level-3”  
        );  


        // Masuk halaman utama  
        tampilkanLayar(“utama-screen”);  

    }  
);

}

// =====================================================
// RESET ERROR
// =====================================================

Function resetErrorScreen() {

sudahKlik = 0;  


if (teksError) {  

    teksError.textContent =  
        pesanError[0];  

}  


If (hitunganKlik) {  

    hitunganKlik.textContent =  
        `0/${KLIK_ERROR}`;  

}  


If (kotakError) {  

    kotakError.classList.remove(  
        “beres”,  
        “shake”  
    );  

}  


Document.body.classList.remove(  
    “error-level-1”,  
    “error-level-2”,  
    “error-level-3”  
);

}

// =====================================================
// 8. TOMBOL NEXT
// =====================================================

Const tombolNext = document.getElementById(“tombol-next”);

If (tombolNext) {
tombolNext.addEventListener(“click”, () => {
window.location.href = "https://htmlku.my.id/25M56";
});
}

// =====================================================
// 9. PROTEKSI AGAR SCREEN AWAL BENAR
// =====================================================

Document.addEventListener(
“DOMContentLoaded”,
() => {

tampilkanLayar(“sandi-screen");  

}

);




