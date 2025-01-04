document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const game = document.getElementById('game');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let isJumping = false;
    let jumpHeight = 0;
    let score = 0;
    let speed = 20; // Initial speed for cactus movement
    let cactusInterval = 2000; // Initial time interval for creating cacti
    let gameLoop;

    function jump() {
        if (isJumping) return;
        isJumping = true;
        let upInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 5;
                    dino.style.bottom = jumpHeight + 10 + 'px'; // Adjusted for ground height
                }, 20);
            }
            jumpHeight += 5;
            dino.style.bottom = jumpHeight + 10 + 'px'; // Adjusted for ground height
        }, 20);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            jump();
        }
    });

    function createCactus() {
        const cactus = document.createElement('img');
        cactus.src = 'download__2_-removebg-preview.png'; // Ensure this path is correct
        cactus.classList.add('cactus');
        game.appendChild(cactus);
        let cactusPosition = game.offsetWidth;

        const moveCactus = setInterval(() => {
            if (cactusPosition < -30) {
                clearInterval(moveCactus);
                cactus.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;

                // Increase speed and reduce interval after reaching a score of 5
                if (score === 5) {
                    speed -= 5; // Increase cactus movement speed
                    cactusInterval -= 500; // Reduce time interval for creating cacti
                    clearInterval(gameLoop); // Clear existing cactus creation loop
                    startGameLoop(); // Start a new loop with updated interval
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
            cactusPosition -= (30 - speed); // Adjust cactus movement based on speed
            cactus.style.left = cactusPosition + 'px';
        }, speed);
    }

    function startGameLoop() {
        gameLoop = setInterval(createCactus, cactusInterval);
    }

    // Start the game loop
    startGameLoop();
});