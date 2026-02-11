// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionBox = document.getElementById('questionBox');
const successMessage = document.getElementById('successMessage');
const heartsBackground = document.querySelector('.hearts-background');

// Create floating hearts in background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '110vh';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
    heart.style.pointerEvents = 'none';
    heartsBackground.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Add CSS animation for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Generate floating hearts periodically
setInterval(createFloatingHeart, 300);

// Yes button click handler
yesBtn.addEventListener('click', () => {
    questionBox.style.display = 'none';
    successMessage.classList.add('show');
    
    // Create celebration effect
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createCelebrationHeart();
        }, i * 100);
    }
});

// Create celebration hearts
function createCelebrationHeart() {
    const heart = document.createElement('div');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
    heart.style.animation = `explode ${Math.random() * 1 + 1}s ease-out`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    document.body.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 300 + 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');

    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add explosion animation
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

// No button hover and click handlers
let moveCount = 0;
const NO_BUTTON_VERTICAL_RANGE = 100; // Vertical movement range in pixels
const YES_BUTTON_GROWTH_RATE = 0.1; // Growth rate per attempt

function moveNoButton() {
    const container = document.querySelector('.buttons');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate available space
    const maxX = containerRect.width - btnRect.width;
    const maxY = NO_BUTTON_VERTICAL_RANGE;
    
    // Generate random position
    const randomX = Math.random() * maxX - (maxX / 2);
    const randomY = (Math.random() * maxY) - (maxY / 2);
    
    // Move the button
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Increase yes button size after each attempt
    moveCount++;
    const newSize = 1 + (moveCount * YES_BUTTON_GROWTH_RATE);
    yesBtn.style.transform = `scale(${newSize})`;
    
    // Make yes button more appealing
    if (moveCount > 3) {
        yesBtn.textContent = 'Yes! 💖';
    }
    if (moveCount > 5) {
        yesBtn.textContent = 'Please say YES! 💕';
    }
}

// Add event listeners to no button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Touch support for mobile devices
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
