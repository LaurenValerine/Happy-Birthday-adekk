// =====================================================
// 🐸 FROG BIRTHDAY EXPERIENCE
// =====================================================

// =====================================================
// KONFIGURASI
// =====================================================

Const JAWABAN_SANDI = “Katak”;
Const KLIK_ERROR = 3;

// =====================================================
// FUNGSI BANTU
// =====================================================

Function wait(ms) {
Return new Promise(resolve => setTimeout(resolve, ms));
}

Function tampilkanLayar(id) {

Document.querySelectorAll(“.screen”).forEach(screen => {  
    Screen.classList.remove(“active”);                    
    Screen.classList.add(“hidden”);  
});  

Const layar = document.getElementById(id);  

If (layar) {  
    Layar.classList.remove(“hidden”);  
    Layar.classList.add(“active”);  
}

}

// =====================================================
// 1. SANDI / TEKA-TEKI
// =====================================================

Const tombolSandi = document.getElementById(“kirim-sandi”);
Const inputSandi = document.getElementById(“jawaban-sandi”);
Const pesanSalah = document.getElementById(“sandi-salah”);

If (tombolSandi) {

tombolSandi.addEventListener(“click”, () => {  

    const jawab = inputSandi.value  
        .trim();  
        .toLowerCase();  

    If (jawab === JAWABAN_SANDI) {  

        // Sembunyikan pesan kesalahan  
        pesanSalah.classList.add(“hidden”);  

        // Lanjut ke countdown  
        tampilkanLayar(“hitung-screen”);  

        mulaiHitungMundur(  
            “angka-hitung”,  
            10,  
            () => {  
                tampilkanLayar(“kue-screen”);  
            }  
        );  

    } else {  

        // Jawaban salah  
        pesanSalah.classList.remove(“hidden”);  

        // Bersihkan input  
        inputSandi.value = “”;  

        inputSandi.focus();  

    }  

});

}

// Bisa menekan ENTER untuk mengirim jawaban

If (inputSandi) {

inputSandi.addEventListener(“keydown”, event => {  

    if (event.key === “Enter”) {  
        tombolSandi.click();  
    }  

});

}

// =====================================================
// 2. COUNTDOWN UMUM
// =====================================================

Function mulaiHitungMundur(id, mulai, selesai) {

Let angka = mulai;  

Const element = document.getElementById(id);  

If (!element) return;  

Element.textContent = angka;  

Const timer = setInterval(() => {  

    Angka--;  

    Element.textContent = angka;  

    // Efek kecil setiap angka berubah  
    Element.classList.remove(“pulse”);  

    Void element.offsetWidth;  

    Element.classList.add(“pulse”);  


    If (angka <= 0) {  

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

Const tombolTiup = document.getElementById(“tiup-lilin”);
Const gambarKue = document.getElementById(“gambar-kue”);

If (tombolTiup) {

tombolTiup.addEventListener(“click”, async () => {  

    tombolTiup.disabled = true;  

    // Efek kue  
    If (gambarKue) {  

        gambarKue.style.transition =  
            “all 0.6s ease”;  

        gambarKue.style.transform =  
            “scale(1.1)”;  

        gambarKue.style.filter =  
            “brightness(1.4)”;  

    }  

    Await wait(600);  


    // Kembalikan tampilan  
    If (gambarKue) {  

        gambarKue.style.transform =  
            “scale(1)”;  

        gambarKue.style.filter =  
            “none”;  

    }  


    Await wait(300);  


    // Masuk countdown terakhir  
    tampilkanLayar(“final-hitung-screen”);  


    mulaiHitungMundur(  
        “angka-final”,  
        3,  
        () => {  

            tampilkanLayar(“hujan-screen”);  

            mulaiHujanTeks();  

        }  
    );  

});

}

// =====================================================
// 4. HUJAN HAPPY BIRTHDAY → MEMBENTUK LOVE
// =====================================================

Async function mulaiHujanTeks() {

Const wadah =  
    Document.getElementById(“wadah-hujan”);  

Const hati =  
    Document.getElementById(“bentuk-hati”);  

Const tombol =  
    Document.getElementById(“lanjut-kado”);  


If (!wadah) return;  


Wadah.innerHTML = “”;  



    // -----------------------------------------------
    // HUJAN TEKS
    // -----------------------------------------------

    Const jumlah = 70;

    For (let i = 0; i < jumlah; i++) {

        setTimeout(() => {

            const teks =
                document.createElement(“span”);

            teks.className =
                “teks-jatuh”;

            Teks.textContent =
                “HAPPY BIRTHDAY”;

            Teks.style.left =
                Math.random() * 100 + “%”;

            Teks.style.animationDelay =
                Math.random() * 0.8 + “s”;

            Teks.style.fontSize =
                (10 + Math.random() * 12) + “px”;

            Wadah.appendChild(teks);

            setTimeout(() => {
                teks.remove();
            }, 4000);

        }, i * 50);

    }

    // Tunggu hujan
    Await wait(4000);


    // -----------------------------------------------
    // BENTUK LOVE
    // -----------------------------------------------
  

If (wadah) {  

    Wadah.innerHTML = “”;  

    Const jumlahLove = 160;  

    For (let i = 0; i < jumlahLove; i++) {  

        Const t =  
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

        Const x =  
            16 *  
            Math.pow(Math.sin(t), 3);  

        Const y =  
            13 * Math.cos(t)  
            - 5 * Math.cos(2 * t)  
            - 2 * Math.cos(3 * t)  
            - Math.cos(4 * t);  


        Const teks =  
            Document.createElement(“span”);  

        Teks.className =  
            “love-text”;  

        Teks.textContent =  
            “HAPPY BIRTHDAY”;  


        Const posX =  
            50 + x * 2.3;  

        Const posY =  
            45 – y * 2.3;  


        Teks.style.left =  
            posX + “%”;  

        teks.style.top =  
            posY + “%”;  


        teks.style.animationDelay =  
            (i * 0.008) + “s”;  


        Wadah.appendChild(teks);  

    }  

}  


// -----------------------------------------------  
// TUNGGU LOVE TERBENTUK  
// -----------------------------------------------  

Await wait(2500);  


// -----------------------------------------------  
// TAMPILKAN TULISAN TENGAH  
// -----------------------------------------------  

If (hati) {  

    Hati.textContent =  
        “HAPPY BIRTHDAY”;  

    Hati.classList.remove(“hidden”);  

    Hati.classList.add(“muncul”);  

}  


Await wait(1500);  


// -----------------------------------------------  
// LANJUT KE KADO  
// -----------------------------------------------  

If (tombol) {  

    Tombol.classList.remove(“hidden”);  

    Tombol.classList.add(“muncul”);  

}

}

// =====================================================
// 5. LANJUT KE KADO
// =====================================================

Const tombolKado =
Document.getElementById(“lanjut-kado”);

If (tombolKado) {

tombolKado.addEventListener(“click”, () => {  

    tampilkanLayar(“kado-screen”);  

});

}

// =====================================================
// 6. KADO — BUKA
// =====================================================

Const gambarKado =
Document.getElementById(“gambar-kado”);

If (gambarKado) {

gambarKado.addEventListener(  
    “click”,  
    Async function () {  

        This.style.transition =  
            “all 0.8s cubic-bezier(.68,-0.55,.27,1.55)”;  

        This.style.transform =  
            “scale(1.3) rotate(15deg)”;  


        Await wait(250);  


        This.style.transform =  
            “scale(0) rotate(360deg)”;  

        This.style.opacity =  
            “0”;  


        Await wait(800);  


        // Reset click error  
        sudahKlik = 0;  

        const counter =  
            document.getElementById(“hitungan-klik”);  

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

Let sudahKlik = 0;

Const kotakError =
Document.getElementById(“kotak-error”);

Const teksError =
Document.getElementById(“teks-error”);

Const hitunganKlik =
Document.getElementById(“hitungan-klik”);

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




