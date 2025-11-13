// إدارة الموسيقى
function initMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    
    // محاولة تشغيل الموسيقى تلقائياً
    setTimeout(() => {
        if (!isPlaying) {
            playMusic();
        }
    }, 2000);
    
    // تبديل تشغيل/إيقاف الموسيقى
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });
    
    function playMusic() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicToggle.querySelector('.nav-tooltip').textContent = 'كتم الصوت';
        }).catch(error => {
            console.log('تعذر تشغيل الموسيقى تلقائياً:', error);
            // عرض رسالة للمستخدم للتفاعل مع الصفحة أولاً
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicToggle.querySelector('.nav-tooltip').textContent = 'تشغيل الموسيقى';
        });
    }
    
    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        musicToggle.querySelector('.nav-tooltip').textContent = 'تشغيل الموسيقى';
    }
    
    // إضافة بيانات المطور الجديد
    document.querySelector('.magnetic-item[data-target="music"]').setAttribute('id', 'musicToggle');
}