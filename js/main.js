// تهيئة كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    setTimeout(() => {
        initThreeJS();
        initCustomCursor();
        initGSAPAnimations();
        initTerminalAnimations();
        initExtraEffects();
        initMusic();
        initEnhancedEffects();
    }, 100);
});

// إدارة شاشة التحميل
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    // محاكاة تقدم التحميل
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // إخفاء شاشة التحميل بعد اكتمال التحميل
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
        loadingProgress.style.width = `${progress}%`;
    }, 200);
}

// تأثيرات إضافية محسنة
function initEnhancedEffects() {
    // إنشاء فقاعات التكنولوجيا
    createTechBubbles();
    
    // إنشاء تأثير المطر الرقمي
    createMatrixRain();
    
    // إضافة مؤشر التقدم
    initProgressBar();
    
    // تحسين تأثير الكتابة
    enhanceTypingEffect();
    
    // إضافة تأثيرات الجسيمات
    initParticleEffects();
}

function createTechBubbles() {
    const sections = ['home', 'services', 'team', 'contact'];
    const icons = ['fa-code', 'fa-robot', 'fa-shield-alt', 'fa-brain', 'fa-cogs', 'fa-microchip', 'fa-server', 'fa-network-wired'];
    
    sections.forEach(sectionId => {
        const container = document.getElementById(sectionId + 'Bubbles');
        if (!container) return;
        
        for (let i = 0; i < 8; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'tech-bubble';
            bubble.innerHTML = `<i class="fas ${icons[i]}"></i>`;
            
            // وضع عشوائي
            const left = Math.random() * 90 + 5;
            const top = Math.random() * 90 + 5;
            bubble.style.left = `${left}%`;
            bubble.style.top = `${top}%`;
            
            container.appendChild(bubble);
            
            // أنيميشن للفقاعة
            gsap.to(bubble, {
                opacity: 0.7,
                duration: 2,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 2,
                ease: "sine.inOut"
            });
            
            gsap.to(bubble, {
                rotation: 360,
                duration: 10 + Math.random() * 10,
                repeat: -1,
                ease: "none"
            });
        }
    });
}

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = "rgba(5, 5, 16, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#00ff9d";
        ctx.font = fontSize + "px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

function enhanceTypingEffect() {
    // إضافة مؤشر الكتابة النهائي
    setTimeout(() => {
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    }, 5000);
}

function initParticleEffects() {
    document.addEventListener('mousemove', function(e) {
        createParticle(e.clientX, e.clientY);
    });
    
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(e.clientX, e.clientY);
            }, i * 50);
        }
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.body.appendChild(particle);
    
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const color = Math.random() > 0.5 ? 'var(--neon-green)' : 'var(--neon-blue)';
    particle.style.background = color;
    
    gsap.set(particle, {
        x: x,
        y: y
    });
    
    gsap.to(particle, {
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            particle.remove();
        }
    });
}