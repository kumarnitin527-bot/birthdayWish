// Birthday Messages - Customize these!
const birthdayMessages = [
    "Every moment with you feels like a beautiful dream. Happy Birthday, my love! You make my world brighter just by being in it.",
    "You are my sunshine on cloudy days, my calm in every storm. Today, I celebrate the day the world was blessed with you.",
    "Another year of your beautiful smile, your warm hugs, and your incredible love. I'm the luckiest person alive. Happy Birthday!",
    "To the one who fills my life with joy and laughter - may this year bring you everything your beautiful heart desires.",
    "Words can never express how much you mean to me. But today, I want you to know - you are my everything. Happy Birthday, gorgeous!",
    "From the first moment I met you, I knew my life would never be the same. Thank you for being you. Happy Birthday, my love!"
];

// DOM Elements
const landing = document.getElementById('landing');
const envelope = document.getElementById('envelope');
const birthdaySection = document.getElementById('birthdaySection');
const heartsContainer = document.getElementById('heartsContainer');
const confettiContainer = document.getElementById('confettiContainer');
const messageEl = document.getElementById('message');
const wishBtn = document.getElementById('wishBtn');

// Initialize
let messageIndex = 0;

// Envelope Click Handler
envelope.addEventListener('click', () => {
    envelope.classList.add('opened');

    setTimeout(() => {
        landing.classList.add('hidden');
        birthdaySection.classList.add('visible');
        typeMessage(birthdayMessages[0]);
        launchConfetti();
    }, 600);
});

// Typing Effect for Messages
function typeMessage(text) {
    messageEl.textContent = '';
    let i = 0;
    const speed = 40;

    function type() {
        if (i < text.length) {
            messageEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Wish Button - Cycle through messages
wishBtn.addEventListener('click', () => {
    messageIndex = (messageIndex + 1) % birthdayMessages.length;
    typeMessage(birthdayMessages[messageIndex]);
    launchConfetti();
    createBurstHearts();
});

// Confetti Effect
function launchConfetti() {
    const colors = ['#ff6b9d', '#f78fb3', '#f8a5c2', '#ffeaa7', '#fdcb6e', '#74b9ff', '#a29bfe'];

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Floating Hearts Background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = ['&#10084;', '&#10083;', '&#9829;'][Math.floor(Math.random() * 3)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    heart.style.color = `hsl(${340 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%)`;
    heart.style.animationDuration = Math.random() * 4 + 4 + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 800);

// Burst Hearts on Wish
function createBurstHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '&#10084;';
            heart.style.left = 40 + Math.random() * 20 + '%';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.color = `hsl(${340 + Math.random() * 30}, 90%, ${60 + Math.random() * 20}%)`;
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// Add sparkle cursor effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.92) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '12px';
        sparkle.style.zIndex = '9999';
        sparkle.style.transition = 'all 1s ease';
        sparkle.style.opacity = '1';
        sparkle.innerHTML = '&#10022;';
        sparkle.style.color = `hsl(${Math.random() * 60 + 320}, 80%, 70%)`;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = `translateY(-30px) scale(0)`;
        }, 50);

        setTimeout(() => sparkle.remove(), 1100);
    }
});
