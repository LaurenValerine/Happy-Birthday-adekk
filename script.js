/* =========================
   BIRTHDAY EXPERIENCE
   OPENING SCRIPT
========================= */


/* =========================
   ELEMENTS
========================= */

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


/* =========================
   OPENING MESSAGE
========================= */

const birthdayMessage =
"Wahai ratu katak yang amat sungguh mulia istri dari sang raja katak J-Hope sekaligus Adek dari calon...calon apa nyakkk?calon pendamping? Calon masa depan? Bomat ahhh masih mumet ama dia mahhhh intinya mohon pilih SALAH SATU dibawah ini dan TIDAK BISA DUA untuk melanjutkan";


/* =========================
   HELPER
========================= */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================
   SHOW / HIDE
========================= */

function show(element) {
    element.classList.remove("hidden");
}

function hide(element) {
    element.classList.add("hidden");
}


/* =========================
   FIREWORK
========================= */

function createFirework() {

    const firework = document.createElement("div");

    firework.textContent = "✦";

    firework.style.position = "absolute";
    firework.style.left = Math.random() * 100 + "%";
    firework.style.top = Math.random() * 70 + "%";
    firework.style.fontSize =
        Math.floor(Math.random() * 30 + 20) + "px";

    firework.style.color = "#ffffff";
    firework.style.opacity = "0";

    firework.style.transition =
        "opacity 0.2s ease, transform 0.6s ease";

    fireworks.appendChild(firework);

    requestAnimationFrame(() => {

        firework.style.opacity = "1";
        firework.style.transform = "scale(1.8)";

    });

    setTimeout(() => {
        firework.style.opacity = "0";
    }, 500);

    setTimeout(() => {
        firework.remove();
    }, 900);
}


/* =========================
   FIREWORK SHOW
========================= */

async function fireworkShow() {

    for (let i = 0; i < 12; i++) {

        createFirework();

        await wait(180);
    }
}


/* =========================
   TYPING EFFECT
========================= */

async function typeText(text, speed = 35) {

    typingText.textContent = "";

    for (let i = 0; i < text.length; i++) {

        typingText.textContent += text[i];

        await wait(speed);
    }
}


/* =========================
   LOADING
========================= */

async function startOpening() {

    await wait(1800);

    hide(loadingScreen);
    show(opening);

    await wait(500);

    fireworkShow();

    await wait(700);

    openingText.style.transition =
        "opacity 1s ease";

    openingText.style.opacity = "1";

    await wait(1800);

    show(continueSection);
}


/* =========================
   YES BUTTON
========================= */

yesButton.addEventListener("click", async () => {

    hide(continueSection);

    await wait(400);

    show(messageSection);

    await wait(500);

    await typeText(birthdayMessage, 30);

    await wait(800);

    hide(messageSection);

    await wait(400);

    show(pathSection);
});


/* =========================
   NO BUTTON
========================= */

noButton.addEventListener("click", () => {

    swapButtons();
});


/* =========================
   SWAP YES / NO
========================= */

function swapButtons() {

    const parent = yesButton.parentElement;

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


/* =========================
   EXTRA NO BUTTON BEHAVIOR
========================= */

noButton.addEventListener("mouseenter", () => {

    if (window.innerWidth > 600) {

        const x =
            Math.random() *
            (window.innerWidth - noButton.offsetWidth);

        const y =
            Math.random() *
            (window.innerHeight - noButton.offsetHeight);

        noButton.style.position = "fixed";

        noButton.style.left = x + "px";
        noButton.style.top = y + "px";
    }
});


/* =========================
   PATH SELECTION
========================= */

frogButton.addEventListener("click", () => {

    window.location.href = "Frog.html";

});


jhopeButton.addEventListener("click", () => {

    window.location.href = "Jhope.html";

});


/* =========================
   START
========================= */

startOpening();
