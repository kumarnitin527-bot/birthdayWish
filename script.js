// ===== CONFIGURATION =====

const CONFIG = {
    loveLetterText: `On this special day, I want you to know that you are the most incredible person I've ever met. Your kindness, your beauty, your spirit — everything about you takes my breath away. Every single day with you is a gift I never take for granted. I promise to love you deeper with every sunrise. Happy Birthday, my love. Here's to forever.`,

    wishResponses: [
        "Your wish is already coming true... because you have my love forever ❤️",
        "I wished the same thing — more moments with you ✨",
        "The stars aligned the day you were born ⭐",
        "Every wish you make, I'll work to make it real ❤️",
        "You deserve all the magic in the world ✨",
        "My biggest wish came true when I found you ⭐"
    ]
};


// ===== DOM ELEMENTS =====

const preloader = document.getElementById("preloader");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const giftBox = document.getElementById("giftBox");
const countdownNum = document.getElementById("countdownNum");

const blowBtn = document.getElementById("blowBtn");
const letterBody = document.getElementById("letterBody");

const magicBtn = document.getElementById("magicBtn");
const wishResult = document.getElementById("wishResult");

const prevReason = document.getElementById("prevReason");
const nextReason = document.getElementById("nextReason");

const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

const particleCanvas = document.getElementById("particleCanvas");
const fireworksContainer = document.getElementById("fireworksContainer");


// ===== PRELOADER =====

window.addEventListener("load", function () {

    setTimeout(function () {

        if (preloader) {
            preloader.classList.add("hidden");
        }

    }, 2000);

});


// ===== PARTICLES =====

if (particleCanvas) {

    const ctx = particleCanvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

    }

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();


    class Particle {

        constructor() {
            this.reset();
        }

        reset() {

            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;

            this.size = Math.random() * 2 + 0.5;

            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;

            this.opacity = Math.random() * 0.5 + 0.2;

            this.color =
                `hsla(${340 + Math.random() * 40}, 80%, 65%, ${this.opacity})`;

        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (
                this.x < 0 ||
                this.x > particleCanvas.width
            ) {
                this.speedX *= -1;
            }

            if (
                this.y < 0 ||
                this.y > particleCanvas.height
            ) {
                this.speedY *= -1;
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = this.color;

            ctx.fill();

        }

    }


    function initParticles() {

        particles = [];

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            particleCanvas.width,
            particleCanvas.height
        );


        particles.forEach(function (particle) {

            particle.update();
            particle.draw();

        });


        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx =
                    particles[i].x - particles[j].x;

                const dy =
                    particles[i].y - particles[j].y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);


                if (distance < 100) {

                    ctx.beginPath();

                    ctx.strokeStyle =
                        `rgba(255, 45, 85, ${0.1 * (1 - distance / 100)})`;

                    ctx.lineWidth = 0.5;

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.stroke();

                }

            }

        }


        requestAnimationFrame(animateParticles);

    }


    initParticles();
    animateParticles();

}


// ===== STARS =====

function createStars() {

    const starsContainer =
        document.getElementById("stars");

    if (!starsContainer) {
        return;
    }


    for (let i = 0; i < 100; i++) {

        const star =
            document.createElement("div");

        star.classList.add("star");

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        star.style.animationDuration =
            Math.random() * 2 + 1 + "s";

        starsContainer.appendChild(star);

    }

}

createStars();


// ===== PAGE TRANSITIONS =====

function showPage(pageToShow) {

    document
        .querySelectorAll(".page")
        .forEach(function (page) {

            page.classList.remove("active");

        });


    if (pageToShow) {
        pageToShow.classList.add("active");
    }

}


// ===== GIFT BOX =====

if (giftBox) {

    giftBox.addEventListener("click", function () {

        // Open gift
        giftBox.classList.add("opened");


        // ===============================
        // START BACKGROUND MUSIC
        // ===============================

        if (bgMusic) {

            bgMusic.volume = 0.7;

            bgMusic.play()
                .then(function () {

                    console.log("Background music started.");

                    if (musicToggle) {
                        musicToggle.classList.add("playing");
                    }

                })
                .catch(function (error) {

                    console.error(
                        "Music could not start:",
                        error
                    );

                });

        }


        // Go to countdown
        setTimeout(function () {

            showPage(page2);

            startCountdown();

        }, 800);

    });

}


// ===== COUNTDOWN =====

function startCountdown() {

    if (!countdownNum) {
        return;
    }


    let count = 3;

    countdownNum.textContent = count;


    const interval =
        setInterval(function () {

            count--;


            if (count > 0) {

                countdownNum.textContent = count;

                countdownNum.style.animation = "none";

                void countdownNum.offsetWidth;

                countdownNum.style.animation =
                    "countPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

            }

            else {

                clearInterval(interval);

                countdownNum.innerHTML = "❤️";


                setTimeout(function () {

                    showPage(page3);

                    initMainPage();

                }, 600);

            }

        }, 1000);

}


// ===== MAIN PAGE =====

function initMainPage() {

    typeLetter();

    launchFireworks();

    observeTimeline();

    observeGallery();

    observeSections();

}


// ===== LOVE LETTER =====

function typeLetter() {

    if (!letterBody) {
        return;
    }


    const text =
        CONFIG.loveLetterText;

    let i = 0;

    letterBody.textContent = "";


    function type() {

        if (i < text.length) {

            letterBody.textContent +=
                text.charAt(i);

            i++;

            setTimeout(type, 30);

        }

    }


    setTimeout(type, 2000);

}


// ===== BLOW CANDLES =====

let candlesBlown = false;


if (blowBtn) {

    blowBtn.addEventListener("click", function () {

        if (candlesBlown) {
            return;
        }

        candlesBlown = true;


        const flames =
            document.querySelectorAll(".candle-flame");


        flames.forEach(function (flame, index) {

            setTimeout(function () {

                flame.classList.add("blown");

            }, index * 200);

        });


        blowBtn.innerHTML =
            "Wish Granted! ✨";

        blowBtn.classList.add("disabled");


        setTimeout(function () {

            launchFireworks();

        }, 500);

    });

}


// ===== FIREWORKS =====

function launchFireworks() {

    if (!fireworksContainer) {
        return;
    }


    const colors = [
        "#ff2d55",
        "#ffd700",
        "#a855f7",
        "#6366f1",
        "#ff8fab",
        "#00d4aa"
    ];


    for (let burst = 0; burst < 5; burst++) {

        setTimeout(function () {

            const x =
                Math.random() * 80 + 10;

            const y =
                Math.random() * 50 + 10;


            for (let i = 0; i < 30; i++) {

                const particle =
                    document.createElement("div");

                particle.classList.add("firework");

                particle.style.left =
                    x + "%";

                particle.style.top =
                    y + "%";


                particle.style.backgroundColor =
                    colors[
                        Math.floor(
                            Math.random() * colors.length
                        )
                    ];


                const angle =
                    Math.PI * 2 / 30 * i;

                const velocity =
                    50 + Math.random() * 80;

                const tx =
                    Math.cos(angle) * velocity;

                const ty =
                    Math.sin(angle) * velocity;


                particle.style.setProperty(
                    "--tx",
                    tx + "px"
                );

                particle.style.setProperty(
                    "--ty",
                    ty + "px"
                );


                particle.style.animation =
                    "fireworkBurst 1.2s ease-out forwards";


                fireworksContainer.appendChild(
                    particle
                );


                setTimeout(function () {

                    particle.remove();

                }, 1500);

            }

        }, burst * 400);

    }

}


// ===== REASONS CAROUSEL =====

let currentReason = 0;

const reasonCards =
    document.querySelectorAll(".reason-card");


function showReason(index) {

    reasonCards.forEach(function (card) {

        card.classList.remove(
            "active",
            "exit"
        );

    });


    if (reasonCards[index]) {

        reasonCards[index]
            .classList.add("active");

    }

}


if (nextReason) {

    nextReason.addEventListener(
        "click",
        function () {

            if (!reasonCards.length) {
                return;
            }


            reasonCards[currentReason]
                .classList.add("exit");


            reasonCards[currentReason]
                .classList.remove("active");


            currentReason =
                (currentReason + 1) %
                reasonCards.length;


            showReason(currentReason);

        }
    );

}


if (prevReason) {

    prevReason.addEventListener(
        "click",
        function () {

            if (!reasonCards.length) {
                return;
            }


            reasonCards[currentReason]
                .classList.remove("active");


            currentReason =
                (currentReason - 1 +
                    reasonCards.length) %
                reasonCards.length;


            showReason(currentReason);

        }
    );

}


// Auto rotate reasons

setInterval(function () {

    if (!reasonCards.length) {
        return;
    }


    reasonCards[currentReason]
        .classList.add("exit");


    reasonCards[currentReason]
        .classList.remove("active");


    currentReason =
        (currentReason + 1) %
        reasonCards.length;


    showReason(currentReason);

}, 5000);


// ===== WISH BUTTON =====

let wishIndex = 0;


if (magicBtn) {

    magicBtn.addEventListener(
        "click",
        function () {

            if (!wishResult) {
                return;
            }


            wishResult.innerHTML =
                CONFIG.wishResponses[wishIndex];


            wishResult.classList.add("visible");


            wishIndex =
                (wishIndex + 1) %
                CONFIG.wishResponses.length;


            launchFireworks();


            magicBtn.style.animation =
                "none";

            void magicBtn.offsetWidth;

            magicBtn.style.animation =
                "gradientShift 3s ease infinite";

        }
    );

}


// ===== TIMELINE OBSERVER =====

function observeTimeline() {

    const timelineItems =
        document.querySelectorAll(".timeline-item");


    if (!timelineItems.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    timelineItems.forEach(function (item) {

        observer.observe(item);

    });

}


// ===== GALLERY OBSERVER =====

function observeGallery() {

    const photoCards =
        document.querySelectorAll(".photo-card");


    if (!photoCards.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    photoCards.forEach(function (card) {

        observer.observe(card);

    });

}


// ===== SECTION OBSERVER =====

function observeSections() {

    const sections =
        document.querySelectorAll(
            ".cake-section, " +
            ".letter-section, " +
            ".reasons-section, " +
            ".memories-section, " +
            ".gallery-section, " +
            ".wish-section, " +
            ".final-section"
        );


    if (!sections.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    sections.forEach(function (section) {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(50px)";

        section.style.transition =
            "all 1s ease";

        observer.observe(section);

    });

}


// ===== BACKGROUND MUSIC TOGGLE =====

if (musicToggle && bgMusic) {

    musicToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (bgMusic.paused) {

                bgMusic.volume = 0.7;


                bgMusic.play()
                    .then(function () {

                        musicToggle.classList.add(
                            "playing"
                        );

                    })
                    .catch(function (error) {

                        console.error(
                            "Music playback failed:",
                            error
                        );

                    });

            }

            else {

                bgMusic.pause();

                musicToggle.classList.remove(
                    "playing"
                );

            }

        }
    );

}


// ===== MOUSE TRAIL =====

document.addEventListener(
    "mousemove",
    function (e) {

        if (Math.random() > 0.9) {

            const trail =
                document.createElement("div");


            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                font-size: ${Math.random() * 12 + 8}px;
                z-index: 9999;
                opacity: 1;
                transition: all 1.2s ease;
                color: hsl(${Math.random() * 40 + 330}, 80%, 65%);
            `;


            trail.innerHTML = [
                "✨",
                "❤️",
                "✦"
            ][
                Math.floor(Math.random() * 3)
            ];


            document.body.appendChild(trail);


            requestAnimationFrame(function () {

                trail.style.opacity = "0";

                trail.style.transform =
                    `translateY(-40px) scale(0) rotate(${Math.random() * 180}deg)`;

            });


            setTimeout(function () {

                trail.remove();

            }, 1300);

        }

    }
);


// ===== TOUCH SUPPORT =====

document.addEventListener(
    "touchmove",
    function (e) {

        const touch = e.touches[0];


        if (Math.random() > 0.85) {

            const trail =
                document.createElement("div");


            trail.style.cssText = `
                position: fixed;
                left: ${touch.clientX}px;
                top: ${touch.clientY}px;
                pointer-events: none;
                font-size: 14px;
                z-index: 9999;
                opacity: 1;
                transition: all 1s ease;
                color: #ff2d55;
            `;


            trail.innerHTML = "❤️";


            document.body.appendChild(trail);


            requestAnimationFrame(function () {

                trail.style.opacity = "0";

                trail.style.transform =
                    "translateY(-30px) scale(0)";

            });


            setTimeout(function () {

                trail.remove();

            }, 1100);

        }

    }
);
