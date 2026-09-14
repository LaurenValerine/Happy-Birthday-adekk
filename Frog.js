/* =========================================
   FROG BIRTHDAY EXPERIENCE
   FINAL JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const screens = {
    riddle: document.getElementById("riddle-screen"),
    countdown: document.getElementById("countdown-screen"),
    cake: document.getElementById("cake-screen"),
    rain: document.getElementById("birthday-rain-screen"),
    gift: document.getElementById("gift-screen"),
    error: document.getElementById("error-screen"),
    birthday: document.getElementById("birthday-screen")
};

const answerInput = document.getElementById("answer");
const submitAnswer = document.getElementById("submit-answer");
const result = document.getElementById("result");

const countdownNumber =
    document.getElementById("countdown-number");

const cakeNext =
    document.getElementById("cake-next");

const birthdayRain =
    document.getElementById("birthday-rain");

const rainNext =
    document.getElementById("rain-next");

const giftButton =
    document.getElementById("gift-button");

const giftExplosion =
    document.getElementById("gift-explosion");

const errorBackground =
    document.getElementById("error-background");

const errorMessage =
    document.getElementById("error-message");

const whiteError =
    document.getElementById("white-error");

const spotifyButton =
    document.getElementById("spotify-button");

const finalNext =
    document.getElementById("final-next");


/* =========================================
   SETTINGS
========================================= */

const correctAnswer = "katak";

let errorClicks = 0;
let birthdayRainStarted = false;


/* =========================================
   HELPER
========================================= */

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(screen) {

    Object.values(screens).forEach(item => {

        item.classList.remove("active");

    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =========================================
   ANSWER NORMALIZATION
========================================= */

function normalizeAnswer(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


/* =========================================
   RIDDLE
========================================= */

async function checkAnswer() {

    const answer =
        normalizeAnswer(answerInput.value);


    if (!answer) {

        result.textContent =
            "Masukkan jawaban terlebih dahulu.";

        answerInput.focus();

        return;
    }


    if (answer !== correctAnswer) {

        result.textContent =
            "Jawaban belum tepat. Coba lagi.";

        answerInput.classList.remove("wrong");

        void answerInput.offsetWidth;

        answerInput.classList.add("wrong");

        return;
    }


    result.textContent =
        "Jawaban benar.";

    answerInput.disabled = true;
    submitAnswer.disabled = true;

    await wait(1000);

    startCountdown();
}


/* =========================================
   RIDDLE EVENTS
========================================= */

submitAnswer.addEventListener(
    "click",
    checkAnswer
);

answerInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            checkAnswer();

        }

    }
);


/* =========================================
   COUNTDOWN
========================================= */

async function startCountdown() {

    showScreen(screens.countdown);


    for (let number = 10; number >= 0; number--) {

        countdownNumber.textContent = number;

        countdownNumber.classList.remove("pop");

        void countdownNumber.offsetWidth;

        countdownNumber.classList.add("pop");

        await wait(1000);

    }


    await wait(500);

    showScreen(screens.cake);
}


/* =========================================
   CAKE
========================================= */

cakeNext.addEventListener(
    "click",
    () => {

        showScreen(screens.rain);

        startBirthdayRain();

    }
);


/* =========================================
   BIRTHDAY RAIN
========================================= */

function startBirthdayRain() {

    if (birthdayRainStarted) {
        return;
    }

    birthdayRainStarted = true;


    const words = [
        "HAPPY BIRTHDAY",
        "HAPPY BIRTHDAY",
        "HAPPY BIRTHDAY",
        "HAPPY BIRTHDAY"
    ];


    /*
        Membuat tulisan jatuh terus-menerus.
    */

    const rainInterval =
        setInterval(() => {

            createRainText();

        }, 180);


    /*
        Setelah beberapa detik,
        tulisan berhenti dibuat.
    */

    setTimeout(() => {

        clearInterval(rainInterval);

    }, 9000);

}


/* =========================================
   CREATE RAIN TEXT
========================================= */

function createRainText() {

    const element =
        document.createElement("span");

    element.className = "rain-text";

    element.textContent =
        "HAPPY BIRTHDAY";


    const left =
        Math.random() * 100;

    const duration =
        3 + Math.random() * 4;

    const rotation =
        -25 + Math.random() * 50;


    element.style.left =
        `${left}%`;

    element.style.animationDuration =
        `${duration}s`;

    element.style.setProperty(
        "--rotation",
        `${rotation}deg`
    );


    birthdayRain.appendChild(element);


    setTimeout(() => {

        element.remove();

    }, duration * 1000 + 500);

}


/* =========================================
   RAIN → GIFT
========================================= */

rainNext.addEventListener(
    "click",
    () => {

        showScreen(screens.gift);

    }
);


/* =========================================
   GIFT CLICK
========================================= */

giftButton.addEventListener(
    "click",
    async () => {

        giftButton.disabled = true;

        giftButton.style.pointerEvents =
            "none";

        giftButton.style.transform =
            "scale(0)";

        giftButton.style.opacity =
            "0";


        giftExplosion.classList.add("explode");


        await createExplosionParticles();


        await wait(1200);


        showErrorScreen();

    }
);


/* =========================================
   EXPLOSION PARTICLES
========================================= */

async function createExplosionParticles() {

    const fragmentCount = 45;

    for (let i = 0; i < fragmentCount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "explosion-particle";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            120 + Math.random() * 380;


        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        particle.style.left = "50%";
        particle.style.top = "50%";


        giftExplosion.appendChild(particle);


        requestAnimationFrame(() => {

            particle.classList.add(
                "particle-fly"
            );

        });


        setTimeout(() => {

            particle.remove();

        }, 1000);

    }

}


/* =========================================
   ERROR SCREEN
========================================= */

function showErrorScreen() {

    errorClicks = 0;

    errorMessage.textContent =
        "SYSTEM FAILURE";


    showScreen(screens.error);


    createErrorBackground();
}


/* =========================================
   ERROR BACKGROUND
========================================= */

function createErrorBackground() {

    errorBackground.innerHTML = "";


    for (let i = 0; i < 70; i++) {

        const word =
            document.createElement("span");

        word.className =
            "error-word";

        word.textContent =
            "ERROR";


        word.style.left =
            `${Math.random() * 100}%`;

        word.style.top =
            `${Math.random() * 100}%`;


        word.style.setProperty(
            "--move-x",
            `${-250 + Math.random() * 500}px`
        );

        word.style.setProperty(
            "--move-y",
            `${-250 + Math.random() * 500}px`
        );

        word.style.setProperty(
            "--rotation",
            `${-30 + Math.random() * 60}deg`
        );


        word.style.animationDuration =
            `${1 + Math.random() * 3}s`;


        errorBackground.appendChild(word);

    }

}


/* =========================================
   WHITE ERROR
========================================= */

whiteError.addEventListener(
    "click",
    async () => {

        errorClicks++;


        /* ==============================
           CLICK 1
        ============================== */

        if (errorClicks === 1) {

            errorMessage.textContent =
                "ERROR LEVEL: 01";


            increaseErrors(35);


            whiteError.style.transform =
                "scale(1.2)";


            await wait(300);


            whiteError.style.transform =
                "scale(1)";

        }


        /* ==============================
           CLICK 2
        ============================== */

        else if (errorClicks === 2) {

            errorMessage.textContent =
                "CRITICAL ERROR";


            increaseErrors(55);


            document.body.style.animation =
                "screenShake 0.4s";


            setTimeout(() => {

                document.body.style.animation =
                    "";

            }, 400);

        }


        /* ==============================
           CLICK 3
        ============================== */

        else if (errorClicks >= 3) {

            errorMessage.textContent =
                "SYSTEM RESTORED";


            whiteError.disabled =
                true;


            await wait(1000);


            showBirthdayScreen();

        }

    }
);


/* =========================================
   INCREASE ERROR
========================================= */

function increaseErrors(amount) {

    for (let i = 0; i < amount; i++) {

        const word =
            document.createElement("span");

        word.className =
            "error-word";

        word.textContent =
            "ERROR";


        word.style.left =
            `${Math.random() * 100}%`;

        word.style.top =
            `${Math.random() * 100}%`;

        word.style.setProperty(
            "--move-x",
            `${-400 + Math.random() * 800}px`
        );

        word.style.setProperty(
            "--move-y",
            `${-400 + Math.random() * 800}px`
        );

        word.style.setProperty(
            "--rotation",
            `${-50 + Math.random() * 100}deg`
        );

        word.style.animationDuration =
            `${0.4 + Math.random() * 1.8}s`;


        errorBackground.appendChild(word);

    }

}


/* =========================================
   BIRTHDAY PAGE
========================================= */

function showBirthdayScreen() {

    showScreen(screens.birthday);

    document.body.style.overflowX =
        "hidden";

}


/* =========================================
   SPOTIFY
========================================= */

spotifyButton.addEventListener(
    "click",
    () => {

        /*
            LINK SPOTIFY AKAN DIMASUKKAN
            SETELAH USER MEMBERIKAN LINK.

            Untuk sekarang tombol tidak
            membuka apa pun.
        */

        spotifyButton.textContent =
            "SOON";

    }
);


/* =========================================
   FINAL NEXT
========================================= */

finalNext.addEventListener(
    "click",
    () => {

        /*
            LINK WEBSITE TERAKHIR
            AKAN DIMASUKKAN NANTI.
        */

        console.log(
            "Final destination belum dihubungkan."
        );

    }
);


/* =========================================
   INITIAL STATE
========================================= */

showScreen(screens.riddle);
