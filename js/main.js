// تهيئة كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    setTimeout(() => {
        initThreeJS();
        initCustomCursor();
        initGSAPAnimations();
        initExtraEffects();
        initMusic();
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