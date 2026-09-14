* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
}

body {
    background: #050505;
    color: white;
    font-family: Arial, sans-serif;
    overflow: hidden;
}

.hidden {
    display: none !important;
}


/* LOADING */

#loading-screen {
    position: fixed;
    inset: 0;
    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #050505;
}

.loading-content {
    text-align: center;
}

.loading-content p {
    font-size: 14px;
    letter-spacing: 4px;
}


/* OPENING */

#opening {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}


/* ALL SCREENS */

#firework-section,
#continue-section,
#message-section,
#path-section {
    width: 100%;
    height: 100vh;
}


/* FIREWORK */

#firework-section {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
}

#fireworks {
    position: absolute;
    inset: 0;
}

.opening-text {
    position: relative;
    z-index: 2;

    text-align: center;
    padding: 25px;
}

.opening-text h1 {
    font-size: clamp(28px, 7vw, 60px);
    opacity: 0;
}


/* DIALOG */

#continue-section,
#message-section {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;
}

.dialog-box {
    width: min(90%, 550px);

    padding: 30px;

    border: 1px solid rgba(255,255,255,.2);
    border-radius: 20px;

    background: rgba(255,255,255,.06);

    backdrop-filter: blur(15px);

    text-align: center;
}

.dialog-box > p:first-child {
    margin-bottom: 25px;

    font-size: clamp(20px, 5vw, 30px);
}


/* BUTTON */

.choice-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.choice-buttons button {
    min-width: 100px;

    padding: 13px 25px;

    border: none;
    border-radius: 999px;

    background: white;
    color: black;

    font-weight: bold;
    cursor: pointer;
}


/* TYPING */

#typing-text {
    min-height: 180px;

    text-align: left;

    font-size: 16px;
    line-height: 1.8;
}


/* PATH */

#path-section {
    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    padding: 20px;

    text-align: center;
}

#path-section h2 {
    margin-bottom: 10px;

    font-size: clamp(28px, 7vw, 45px);
}

#path-section > p {
    margin-bottom: 35px;

    font-size: 12px;
    letter-spacing: 3px;
}


/* PATH BUTTON */

.path-buttons {
    display: flex;

    justify-content: center;

    gap: 20px;
}

.path-buttons button {
    width: 160px;
    height: 160px;

    border: 1px solid rgba(255,255,255,.2);
    border-radius: 25px;

    background: rgba(255,255,255,.07);
    color: white;

    font-weight: bold;
    cursor: pointer;

    transition: .3s;
}

.path-buttons button:hover {
    transform: translateY(-8px);
}

.path-buttons span {
    display: block;
    margin-top: 10px;
}


@media (max-width: 600px) {

    .path-buttons {
        gap: 12px;
    }

    .path-buttons button {
        width: 140px;
        height: 140px;
    }

    #typing-text {
        font-size: 14px;
    }

}
