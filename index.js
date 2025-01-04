document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const game = document.getElementById('game');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let isJumping = false;
    let jumpHeight = 0;
    let score = 0;
    let cactusSpeed = 5; // Initial cactus speed (movement per interval)

    function jump() {
        if (isJumping) return; // Prevent multiple jumps at the same time
        isJumping = true;
        let upInterval = setInterval(() => {
            if (jumpHeight >= 150) { // Maximum jump height
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) { // Dino lands
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 5; // Dino comes down
                    dino.style.bottom = jumpHeight + 10 + 'px'; // Adjust bottom position
                }, 20);
            }
            jumpHeight += 5; // Dino goes up
            dino.style.bottom = jumpHeight + 10 + 'px';
        }, 20);
    }

    // Keyboard support for desktops
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            jump();
        }
    });

    // Touch support for mobile devices
    game.addEventListener('touchstart', () => {
        jump();
    });

    function createCactus() {
        const cactus = document.createElement('img');
        cactus.src = 'download__2_-removebg-preview.png'; // Path to cactus image
        cactus.classList.add('cactus');
        game.appendChild(cactus);
        let cactusPosition = game.offsetWidth;

        const moveCactus = setInterval(() => {
            if (cactusPosition < -30) {
                clearInterval(moveCactus);
                cactus.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;

                // Increase speed after 5 scores
                if (score >= 5) {
                    cactusSpeed = 8; // Increase cactus speed after 5 scores
                }
            } else if (
                cactusPosition < dino.offsetLeft + dino.offsetWidth &&
                cactusPosition + 30 > dino.offsetLeft &&
                parseInt(window.getComputedStyle(dino).bottom) < 60
            ) {
                clearInterval(moveCactus);
                alert(`Game Over! Your Score: ${score}`);
                location.reload();
            }
            cactusPosition -= cactusSpeed; // Move cactus at dynamic speed
            cactus.style.left = cactusPosition + 'px';
        }, 20);
    }

    // Create a new cactus every 2 seconds
    setInterval(createCactus, 2000);
});
