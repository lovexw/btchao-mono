// ==================== FAQ 交互功能 ====================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // 关闭其他打开的 FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherQuestion.classList.remove('active');
                    otherAnswer.classList.remove('active');
                }
            });
            
            // 切换当前 FAQ
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
    
    // 平滑滚动导航
    setupSmoothNavigation();
    
    // 添加页面加载动画
    addPageLoadAnimation();
    
    // 监听滚动以添加视差效果
    setupScrollEffects();
});

// ==================== 平滑导航 ====================
function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // 关闭任何打开的 FAQ（移动设备）
            document.querySelectorAll('.faq-answer.active').forEach(answer => {
                answer.classList.remove('active');
                answer.previousElementSibling.classList.remove('active');
            });
            
            // 平滑滚动到目标
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// ==================== 页面加载动画 ====================
function addPageLoadAnimation() {
    const cards = document.querySelectorAll('.step-card, .tip-item, .faq-item');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// ==================== 滚动效果 ====================
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加阴影效果
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ==================== 工具函数 ====================

// 返回顶部功能
function createBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑ 顶部';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 10px 15px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 99;
        width: 50px;
        height: 50px;
        font-size: 24px;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.justifyContent = 'center';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 页面加载完成后创建返回顶部按钮
window.addEventListener('load', createBackToTop);

// ==================== 分析追踪（可选） ====================
function trackEvent(category, action, label) {
    // 这里可以集成 Google Analytics 或其他分析工具
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// 跟踪 FAQ 点击
document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-question')) {
        const questionText = e.target.closest('.faq-question').querySelector('span').textContent;
        trackEvent('FAQ', 'click', questionText);
    }
});

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', function(e) {
    // Alt + 0: 回到顶部
    if (e.altKey && e.key === '0') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Alt + 1: 跳到步骤
    if (e.altKey && e.key === '1') {
        document.querySelector('#steps').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Alt + 2: 跳到安全提示
    if (e.altKey && e.key === '2') {
        document.querySelector('#tips').scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Alt + 3: 跳到 FAQ
    if (e.altKey && e.key === '3') {
        document.querySelector('#faq').scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// ==================== 生成分享链接 ====================
function generateShareLink() {
    const currentUrl = window.location.href;
    const shareButtons = document.createElement('div');
    shareButtons.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 98;
    `;
    
    // 这里可以添加分享按钮
    // document.body.appendChild(shareButtons);
}

// ==================== 打印功能 ====================
function setupPrintStyles() {
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            .navbar, .footer {
                display: none;
            }
            
            .step-card {
                page-break-inside: avoid;
                box-shadow: none;
                border: 1px solid #ddd;
                margin-bottom: 20px;
            }
            
            .disclaimer-box {
                border: 2px solid #000;
            }
        }
    `;
    document.head.appendChild(printStyle);
}

setupPrintStyles();

// ==================== 黑暗模式支持（可选） ====================
function setupDarkModeToggle() {
    // 检查系统是否偏好黑暗模式
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 可以在这里添加黑暗模式逻辑
    }
}

setupDarkModeToggle();

// ==================== 性能监测 ====================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
    });
}
