document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const game = document.getElementById('game');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let isJumping = false;
    let jumpHeight = 0;
    let score = 0;
    let cactusSpeed = 5; 

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
                    dino.style.bottom = jumpHeight + 10 + 'px'; 
                }, 20);
            }
            jumpHeight += 5; 
            dino.style.bottom = jumpHeight + 10 + 'px';
        }, 20);
    }

   
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            jump();
        }
    });

    
    game.addEventListener('touchstart', () => {
        jump();
    });

    function createCactus() {
        const cactus = document.createElement('img');
        cactus.src = 'download__2_-removebg-preview.png'; 
        cactus.classList.add('cactus');
        game.appendChild(cactus);
        let cactusPosition = game.offsetWidth;

        const moveCactus = setInterval(() => {
            if (cactusPosition < -30) {
                clearInterval(moveCactus);
                cactus.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;

                
                if (score >= 5) {
                    cactusSpeed = 8; 
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
            cactusPosition -= cactusSpeed; 
            cactus.style.left = cactusPosition + 'px';
        }, 20);
    }

    
    setInterval(createCactus, 2000);
});
