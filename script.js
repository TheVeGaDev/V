// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة جميع الوظائف
    initNavigation();
    initScrollAnimations();
    initTypewriterEffect();
    initInteractiveElements();
    initErrorHandling();
    initPerformanceOptimizations();
});

// إدارة التنقل
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // تبديل قائمة التنقل
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            // تحديث الرابط النشط
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // تحديث الرابط النشط أثناء التمرير
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navHeight = 80;
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// تأثيرات التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // تأثيرات خاصة للبطاقات
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('feature-item') ||
                    entry.target.classList.contains('team-member')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    const animatedElements = document.querySelectorAll(
        '.service-card, .feature-item, .team-member, .contact-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// تأثير الكتابة
function initTypewriterEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            typeWriter(line, text, 50);
        }, index * 1000);
    });
    
    function typeWriter(element, text, speed) {
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }
}

// العناصر التفاعلية
function initInteractiveElements() {
    // تأثيرات التحويم على البطاقات
    const cards = document.querySelectorAll('.service-card, .feature-item, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثيرات الأزرار
    const buttons = document.querySelectorAll('.btn, .contact-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });
    
    // عدادات الإحصائيات
    initCounters();
}

// عدادات متحركة
function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2000;
                const step = finalValue / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= finalValue) {
                        current = finalValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current) + (target.textContent.includes('%') ? '%' : '+');
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// معالجة الأخطاء
function initErrorHandling() {
    // معالجة أخطاء الصور
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('فشل تحميل الصورة:', e.target.src);
        }
    }, true);
    
    // معالجة أخطاء الروابط
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) {
                e.preventDefault();
                console.error('العنصر المستهدف غير موجود:', targetId);
                return;
            }
        });
    });
    
    // معالجة الأخطاء العامة
    window.addEventListener('error', function(e) {
        console.error('حدث خطأ:', e.error);
    });
}

// تحسين الأداء
function initPerformanceOptimizations() {
    // التحميل البطيء للصور
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // إلغاء تحميل العناصر غير المرئية
    let ticking = false;
    
    function updateAnimations() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // تحسين الذاكرة
    window.addEventListener('beforeunload', function() {
        // تنظيف الـ event listeners
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
        });
    });
}

// وظائف مساعدة إضافية
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// تصدير الوظائف للاستخدام العالمي (للتطوير)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollAnimations,
        initTypewriterEffect,
        initInteractiveElements,
        initErrorHandling,
        initPerformanceOptimizations,
        debounce,
        throttle
    };
}
