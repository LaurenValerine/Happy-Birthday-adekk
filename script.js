/* =========================================
   BIRTHDAY EXPERIENCE
   OPENING SCRIPT - FINAL
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const loadingScreen = document.getElementById("loading-screen");
const opening = document.getElementById("opening");

const fireworkSection = document.getElementById("firework-section");
const fireworks = document.getElementById("fireworks");
const openingText = document.querySelector(".opening-text h1");

const continueSection = document.getElementById("continue-section");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const messageSection = document.getElementById("message-section");
const typingText = document.getElementById("typing-text");

const pathSection = document.getElementById("path-section");
const frogButton = document.getElementById("frog-button");
const jhopeButton = document.getElementById("jhope-button");


/* =========================================
   MESSAGE
========================================= */

const birthdayMessage =
"Wahai ratu katak yang amat sungguh mulia istri dari sang raja katak J-Hope sekaligus Adek dari calon...calon apa nyakkk?calon pendamping? Calon masa depan? Bomat ahhh masih mumet ama dia mahhhh intinya mohon pilih SALAH SATU dibawah ini dan TIDAK BISA DUA untuk melanjutkan";


/* =========================================
   UTILITY
========================================= */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function show(element) {
    if (element) {
        element.classList.remove("hidden");
    }
}


function hide(element) {
    if (element) {
        element.classList.add("hidden");
    }
}


/* =========================================
   SCREEN CONTROL
========================================= */

function hideAllOpeningScreens() {

    hide(fireworkSection);
    hide(continueSection);
    hide(messageSection);
    hide(pathSection);

}


function showScreen(screen) {

    hideAllOpeningScreens();

    show(screen);

}


/* =========================================
   FIREWORK
========================================= */

function createFirework() {

    if (!fireworks) return;

    const firework = document.createElement("div");

    firework.textContent = "✦";

    firework.style.position = "absolute";

    firework.style.left =
        Math.random() * 100 + "%";

    firework.style.top =
        Math.random() * 70 + "%";

    firework.style.fontSize =
        Math.floor(Math.random() * 30 + 20) + "px";

    firework.style.color = "#ffffff";

    firework.style.opacity = "0";

    firework.style.transform = "scale(0.3)";

    firework.style.transition =
        "opacity 0.25s ease, transform 0.6s ease";

    fireworks.appendChild(firework);


    requestAnimationFrame(() => {

        firework.style.opacity = "1";

        firework.style.transform = "scale(1.8)");

    });


    setTimeout(() => {

        firework.style.opacity = "0";

    }, 450);


    setTimeout(() => {

        firework.remove();

    }, 900);

}


async function fireworkShow() {

    for (let i = 0; i < 18; i++) {

        createFirework();

        await wait(160);

    }

}


/* =========================================
   TYPING EFFECT
========================================= */

async function typeText(text, speed = 30) {

    if (!typingText) return;

    typingText.textContent = "";

    for (let i = 0; i < text.length; i++) {

        typingText.textContent += text[i];

        await wait(speed);

    }

}


/* =========================================
   OPENING SEQUENCE
========================================= */

async function startOpening() {

    /*
        Pastikan loading terlihat
        ketika halaman pertama kali dibuka.
    */

    if (loadingScreen) {
        loadingScreen.classList.remove("hidden");
    }


    /*
        Opening juga dipersiapkan.
    */

    if (opening) {
        opening.classList.remove("hidden");
    }


    /*
        Tunggu loading.
    */

    await wait(1800);


    /*
        HILANGKAN LOADING
    */

    hide(loadingScreen);


    /*
        Tampilkan fireworks.
    */

    showScreen(fireworkSection);


    /*
        Fireworks mulai.
    */

    await fireworkShow();


    /*
        Tunggu sebentar.
    */

    await wait(400);


    /*
        Tampilkan tulisan.
    */

    if (openingText) {

        openingText.style.transition =
            "opacity 1s ease, transform 1s ease";

        openingText.style.transform =
            "translateY(0)";

        openingText.style.opacity = "1";

    }


    /*
        Beri waktu membaca tulisan.
    */

    await wait(1800);


    /*
        Masuk ke dialog.
    */

    showScreen(continueSection);

}


/* =========================================
   YA BUTTON
========================================= */

if (yesButton) {

    yesButton.addEventListener("click", async () => {

        /*
            Hilangkan dialog.
        */

        hide(continueSection);


        await wait(350);


        /*
            Tampilkan pesan.
        */

        showScreen(messageSection);


        await wait(500);


        /*
            Efek mengetik.
        */

        await typeText(
            birthdayMessage,
            28
        );


        await wait(900);


        /*
            Masuk pilihan.
        */

        showScreen(pathSection);

    });

}


/* =========================================
   TIDAK BUTTON
========================================= */

if (noButton) {

    noButton.addEventListener("click", () => {

        swapButtons();

    });


    /*
        Desktop:
        tombol TIDAK kabur.
    */

    noButton.addEventListener("mouseenter", () => {

        if (window.innerWidth <= 600) {
            return;
        }


        const maxX =
            Math.max(
                10,
                window.innerWidth -
                noButton.offsetWidth -
                10
            );


        const maxY =
            Math.max(
                10,
                window.innerHeight -
                noButton.offsetHeight -
                10
            );


        const x =
            Math.random() * maxX;


        const y =
            Math.random() * maxY;


        noButton.style.position = "fixed";

        noButton.style.left =
            x + "px";

        noButton.style.top =
            y + "px";

    });

}


/* =========================================
   SWAP YA / TIDAK
========================================= */

function swapButtons() {

    if (!yesButton || !noButton) {
        return;
    }


    const parent =
        yesButton.parentElement;


    if (!parent) {
        return;
    }


    if (yesButton.nextElementSibling === noButton) {

        parent.insertBefore(
            noButton,
            yesButton
        );

    } else {

        parent.insertBefore(
            yesButton,
            noButton
        );

    }

}


/* =========================================
   PATH SELECTION
========================================= */

if (frogButton) {

    frogButton.addEventListener("click", () => {

        window.location.href =
            "Frog.html";

    });

}


if (jhopeButton) {

    jhopeButton.addEventListener("click", () => {

        window.location.href =
            "Jhope.html";

    });

}


/* =========================================
   START
========================================= */

startOpening();
