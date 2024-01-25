window.onload = function() {
    updateDaysSince();
    setInterval(updateDaysSince, 86400000); // Update the counter every day
};

function updateDaysSince() {
    const startDate = new Date('2024-01-19');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysSince').innerText = diffDays;
}

function incrementAirsoft() {
    const airsoftCounter = document.getElementById('airsoftTimes');
    let currentCount = parseInt(airsoftCounter.innerText);
    airsoftCounter.innerText = currentCount + 1;
    launchConfetti();
    playCelebrationSound()
}

function launchConfetti() {
    const confettiCount = 50000;
    const confettiWrapper = document.getElementById('confetti-wrapper');
    confettiWrapper.innerHTML = ''; // Clear previous confetti

    for (let i = 0; i < confettiCount; i++) {
        let confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.cssText = `
            top: ${-Math.random() * 20}vh; /* Start above the screen */
            left: ${Math.random() * 100}vw;
            background-color: ${randomColor()};
            transform: scale(${Math.random() + 0.5});
            opacity: 1; /* Start fully visible */
        `;
        confettiWrapper.appendChild(confettiPiece);
        animateConfettiPiece(confettiPiece);
    }
}

function animateConfettiPiece(piece) {
    setTimeout(() => {
        piece.style.cssText += `
            transform: translate3d(${Math.random() * 200 - 100}vw, 120vh, 0) rotate(${Math.random() * 720 - 360}deg);
            opacity: 0;
        `;
        piece.addEventListener('transitionend', () => {
            piece.remove(); // Remove piece after animation to clean up the DOM
        });
    }, 100); // Small delay to ensure the CSS is applied
}

function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

function playCelebrationSound() {
    var audio = new Audio('Images/YAY.mp3');
    audio.play();
    startBounceEffect();
}

function startBounceEffect(audio) {
    const beatTime = 60 / 96;
    const allElements = document.querySelectorAll('body *:not(.background-image, .background-image *, .confetti-piece, #confetti-wrapper)');
    allElements.forEach(el => {
        el.style.animationDuration = `${beatTime}s`;
        el.classList.add('bounce');
    });
}