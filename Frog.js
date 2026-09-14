// ==========================================
// KONFIGURASI
// ==========================================
const JAWABAN_SANDI = "Katak"; // Ubah kalau mau jawaban lain
const KLIK_ERROR = 5; // Berapa kali klik untuk lanjut

// ==========================================
// FUNGSI BANTU
// ==========================================
function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function tampilkanLayar(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ==========================================
// 1. SANDI / TEKA-TEKI
// ==========================================
document.getElementById('kirim-sandi').addEventListener('click', () => {
    const jawab = document.getElementById('jawaban-sandi').value.trim().toLowerCase();
    if (jawab === JAWABAN_SANDI) {
        tampilkanLayar('hitung-screen');
        mulaiHitungMundur('angka-hitung', 10, () => {
            tampilkanLayar('kue-screen');
        });
    } else {
        document.getElementById('sandi-salah').classList.remove('hidden');
    }
});

// ==========================================
// 2. COUNTDOWN UMUM
// ==========================================
function mulaiHitungMundur(id, mulai, selesai) {
    let n = mulai;
    const el = document.getElementById(id);
    el.textContent = n;
    const timer = setInterval(() => {
        n--;
        el.textContent = n;
        if (n <= 0) {
            clearInterval(timer);
            selesai();
        }
    }, 1000);
}

// ==========================================
// 3. KUE — TIUP LILIN
// ==========================================
document.getElementById('tiup-lilin').addEventListener('click', async () => {
    const kue = document.getElementById('gambar-kue');
    kue.style.filter = 'brightness(1.4)';
    kue.style.transform = 'scale(1.1)';
    await wait(600);
    kue.style.filter = 'none';
    kue.style.transform = 'none';
    
    tampilkanLayar('final-hitung-screen');
    mulaiHitungMundur('angka-final', 3, () => {
        tampilkanLayar('hujan-screen');
        mulaiHujanTeks();
    });
});

// ==========================================
// 4. HUJAN HAPPY BIRTHDAY
// ==========================================
async function mulaiHujanTeks() {
    const wadah = document.getElementById('wadah-hujan');
    const kata = 'HAPPY BIRTHDAY ';
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'teks-jatuh';
            span.textContent = kata;
            span.style.left = Math.random() * 75 + '%';
            wadah.appendChild(span);
            setTimeout(() => span.remove(), 3000);
        }, i * 200);
    }

    await wait(3500);
    document.getElementById('bentuk-hati').classList.remove('hidden');
    document.getElementById('lanjut-kado').classList.remove('hidden');
}

document.getElementById('lanjut-kado').addEventListener('click', () => {
    tampilkanLayar('kado-screen');
});

// ==========================================
// 5. KADO — KLIK BUKA
// ==========================================
document.getElementById('gambar-kado').addEventListener('click', async function() {
    this.style.transform = 'scale(0) rotate(360deg)';
    this.style.transition = 'all 0.8s ease';
    await wait(800);
    tampilkanLayar('error-screen');
});

// ==========================================
// 6. ERROR — KLIK BERKALI-KALI
// ==========================================
let sudahKlik = 0;
const kotakError = document.getElementById('kotak-error');

kotakError.addEventListener('click', async () => {
    sudahKlik++;
    document.getElementById('hitungan-klik').textContent = `${sudahKlik}/${KLIK_ERROR}`;
    
    if (sudahKlik >= KLIK_ERROR) {
        kotakError.classList.add('beres');
        kotakError.innerHTML = `<h3>✅ SISTEM DIPERBAIKI!</h3><p>Kejutan terbuka...</p>`;
        await wait(1500);
        tampilkanLayar('utama-screen');
    }
});

// ==========================================
// 7. TOMBOL NEXT
// ==========================================
document.getElementById('tombol-next').addEventListener('click', () => {
    alert('Terima kasih sudah membuka! 🐸💚\n\nGanti dengan link website berikutnya~');
    // Contoh: window.location.href = 'jhope.html';
});
