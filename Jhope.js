/* =========================================================
   J-HOPE BIRTHDAY EXPERIENCE
   BLACK + BROWN ROUTE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const screens = {
    riddle: document.getElementById("riddle-screen"),
    countdown: document.getElementById("countdown-screen"),
    cake: document.getElementById("cake-screen"),
    rain: document.getElementById("birthday-rain-screen"),
    gift: document.getElementById("gift-screen"),
    error: document.getElementById("error-screen"),
    birthday: document.getElementById("birthday-screen")
};

const answerInput =
    document.getElementById("answer");

const submitAnswer =
    document.getElementById("submit-answer");

const result =
    document.getElementById("result");

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

const birthdayCard =
    document.querySelector(".birthday-card");


/* =========================================================
   SETTINGS
========================================================= */

const correctAnswer = "matahari";

let errorClicks = 0;
let birthdayRainStarted = false;
let errorTransitionLocked = false;


/* =========================================================
   UTILITY
========================================================= */

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


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


function normalizeAnswer(value) {

    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}


/* =========================================================
   RIDDLE
========================================================= */

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
            "Belum tepat. J-Hope bilang coba lagi.";

        answerInput.classList.remove("wrong");

        void answerInput.offsetWidth;

        answerInput.classList.add("wrong");

        return;
    }


    result.textContent =
        "Jawaban benar. ACCESS GRANTED.";

    answerInput.disabled = true;
    submitAnswer.disabled = true;

    await wait(1000);

    startCountdown();
}


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


/* =========================================================
   COUNTDOWN
========================================================= */

async function startCountdown() {

    showScreen(screens.countdown);

    for (
        let number = 10;
        number >= 0;
        number--
    ) {

        countdownNumber.textContent =
            number;

        countdownNumber.classList.remove(
            "pop"
        );

        void countdownNumber.offsetWidth;

        countdownNumber.classList.add(
            "pop"
        );

        await wait(1000);
    }


    await wait(500);

    showScreen(screens.cake);
}


/* =========================================================
   CAKE
========================================================= */

cakeNext.addEventListener(
    "click",
    () => {

        showScreen(screens.rain);

        startBirthdayRain();

    }
);


/* =========================================================
   HAPPY BIRTHDAY RAIN
========================================================= */

function startBirthdayRain() {

    if (birthdayRainStarted) {
        return;
    }

    birthdayRainStarted = true;


    const rainInterval =
        setInterval(() => {

            createRainText();

        }, 160);


    setTimeout(() => {

        clearInterval(rainInterval);

    }, 8500);

}


function createRainText() {

    const element =
        document.createElement("span");

    element.className =
        "rain-text";

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


/* =========================================================
   RAIN NEXT
========================================================= */

rainNext.addEventListener(
    "click",
    () => {

        showScreen(screens.gift);

    }
);


/* =========================================================
   GIFT
========================================================= */

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


        giftExplosion.classList.add(
            "explode"
        );


        createExplosionParticles();


        document.body.style.animation =
            "screenShake 0.5s";


        setTimeout(() => {

            document.body.style.animation =
                "";

        }, 500);


        await wait(1200);

        showErrorScreen();

    }
);


/* =========================================================
   GIFT EXPLOSION PARTICLES
========================================================= */

function createExplosionParticles() {

    const fragmentCount = 55;


    for (
        let i = 0;
        i < fragmentCount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "explosion-particle";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 450;


        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        particle.style.left =
            "50%";

        particle.style.top =
            "50%";


        giftExplosion.appendChild(
            particle
        );


        requestAnimationFrame(() => {

            particle.classList.add(
                "particle-fly"
            );

        });


        setTimeout(() => {

            particle.remove();

        }, 1100);

    }

}


/* =========================================================
   ERROR SCREEN
========================================================= */

function showErrorScreen() {

    errorClicks = 0;
    errorTransitionLocked = false;

    errorMessage.textContent =
        "SYSTEM FAILURE";

    whiteError.disabled = false;

    whiteError.style.transform =
        "scale(1)";

    showScreen(screens.error);

    createErrorBackground();

}


/* =========================================================
   ERROR BACKGROUND
========================================================= */

function createErrorBackground() {

    errorBackground.innerHTML = "";

    createErrors(70, 250, 500, 1, 3);

}


/* =========================================================
   CREATE RED ERRORS
========================================================= */

function createErrors(
    amount,
    movement,
    durationMin,
    durationRandom,
    sizeRandom
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

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
            `${-movement + Math.random() * movement * 2}px`
        );

        word.style.setProperty(
            "--move-y",
            `${-movement + Math.random() * movement * 2}px`
        );


        word.style.setProperty(
            "--rotation",
            `${-40 + Math.random() * 80}deg`
        );


        word.style.fontSize =
            `${12 + Math.random() * (sizeRandom * 5)}px`;


        word.style.animationDuration =
            `${durationMin / 1000 + Math.random() * durationRandom}s`;


        errorBackground.appendChild(
            word
        );

    }

}


/* =========================================================
   ERROR LEVELS
========================================================= */

whiteError.addEventListener(
    "click",
    handleErrorClick
);


async function handleErrorClick() {

    if (errorTransitionLocked) {
        return;
    }


    errorClicks++;


    /* -----------------------------------------
       FIRST CLICK
    ----------------------------------------- */

    if (errorClicks === 1) {

        errorMessage.textContent =
            "ERROR LEVEL: 01";

        createErrors(
            35,
            400,
            400,
            1.8,
            5
        );


        whiteError.style.transform =
            "scale(1.25)";


        await wait(250);


        whiteError.style.transform =
            "scale(1)";


        return;
    }


    /* -----------------------------------------
       SECOND CLICK
    ----------------------------------------- */

    if (errorClicks === 2) {

        errorMessage.textContent =
            "CRITICAL ERROR";


        createErrors(
            55,
            600,
            300,
            1.5,
            7
        );


        document.body.style.animation =
            "screenShake 0.45s";


        setTimeout(() => {

            document.body.style.animation =
                "";

        }, 450);


        whiteError.style.transform =
            "scale(1.4)";


        await wait(300);


        whiteError.style.transform =
            "scale(1)";


        return;
    }


    /* -----------------------------------------
       THIRD CLICK
    ----------------------------------------- */

    if (errorClicks >= 3) {

        errorTransitionLocked = true;

        errorMessage.textContent =
            "SYSTEM RESTORED";

        whiteError.disabled = true;


        await wait(900);


        showBirthdayScreen();

    }

}


/* =========================================================
   BIRTHDAY PAGE
========================================================= */

function showBirthdayScreen() {

    showScreen(screens.birthday);

    document.body.style.overflowX =
        "hidden";

}


/* =========================================================
   BIRTHDAY CARD
========================================================= */

if (birthdayCard) {

    birthdayCard.addEventListener(
        "click",
        () => {

            birthdayCard.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   SPOTIFY
========================================================= */

spotifyButton.addEventListener(
    "click",
    () => {

        /*
         * Spotify link belum dimasukkan.
         * Jangan arahkan ke link palsu.
         */

        spotifyButton.textContent =
            "SOON";

        spotifyButton.disabled =
            true;

    }
);


/* =========================================================
   FINAL DESTINATION
========================================================= */

finalNext.addEventListener(
    "click",
    () => {

        /*
         * LINK WEBSITE TERAKHIR AKAN
         * DIMASUKKAN SETELAH LINK DIBERIKAN.
         */

        console.log(
            "Final destination belum dihubungkan."
        );

    }
);


/* =========================================================
   START
========================================================= */

showScreen(screens.riddle);
