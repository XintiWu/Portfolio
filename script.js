// 科技感互動效果
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滾動效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // 使用自定義滾動位置，避免切割內容
                    const headerElement = document.querySelector('.header');
                    const headerHeight = headerElement ? headerElement.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 5;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 文字打字機效果
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // 為標題添加打字機效果
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        setTimeout(() => {
            typeWriter(mainTitle, originalText, 150);
        }, 500);
    }

    // 滑鼠跟隨光效
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor-glow');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'cursor-glow';
            newCursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(59,130,246,0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: screen;
            `;
            document.body.appendChild(newCursor);
        }
        
        const cursorElement = document.querySelector('.cursor-glow');
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    });

    // Scrollytelling 沉浸式滾動效果
    let scrollTicking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // 視差效果
        const parallaxElements = document.querySelectorAll('.artwork');
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // 區段進入視窗時的動畫
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrolled >= sectionTop - windowHeight * 0.5 && scrolled < sectionTop + sectionHeight) {
                section.classList.add('active');
                
                // 根據不同區段添加特殊效果
                if (sectionId === 'photography') {
                    document.body.style.background = 'linear-gradient(135deg, #000000 0%, #0f172a 50%, #1e293b 100%)';
                } else if (sectionId === 'projects') {
                    document.body.style.background = '#000000';
                } else if (sectionId === 'hero') {
                    document.body.style.background = '#000000';
                }
            } else {
                section.classList.remove('active');
            }
        });
        
        // 滾動進度指示器
        const scrollProgress = (scrolled / (document.documentElement.scrollHeight - windowHeight)) * 100;
        updateScrollProgress(scrollProgress);
        
        scrollTicking = false;
    }
    
    function updateScrollProgress(progress) {
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${progress}%;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #1e3a8a);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollEffects);
            scrollTicking = true;
        }
    });

    // 元素進入視窗時的動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 觀察所有需要動畫的元素
    const animatedElements = document.querySelectorAll('.content-left, .content-right, .info-list li');
    animatedElements.forEach(el => observer.observe(el));

    // 科技感按鈕點擊效果
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // 添加漣漪動畫CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 為所有連結添加漣漪效果
    const links = document.querySelectorAll('.link, .nav-link');
    links.forEach(link => {
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        link.addEventListener('click', createRipple);
    });

    // 鍵盤導航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // 高質感粒子背景效果
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);

        // 創建粒子層 - 封裝在 createParticles 函數內
        function createParticleLayer(container, count, size, opacity, color, minDuration, maxDuration) {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                const duration = Math.random() * (maxDuration - minDuration) + minDuration;
                const delay = Math.random() * 5;
                const animationType = ['floatUp', 'floatDown', 'floatLeft', 'floatRight'][Math.floor(Math.random() * 4)];
                
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    opacity: ${opacity};
                    animation: ${animationType} ${duration}s ${delay}s infinite linear;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color};
                    filter: brightness(1.5) saturate(1.3);
                `;
                
                // 添加發光效果 - 明顯但線條簡約版本
                const glow = document.createElement('div');
                glow.className = 'particle-glow';
                glow.style.cssText = `
                    width: ${size * 4}px;
                    height: ${size * 4}px;
                    left: -${size * 1.5}px;
                    top: -${size * 1.5}px;
                    opacity: 0.8;
                `;
                particle.appendChild(glow);
                
                container.appendChild(particle);
            }
        }

        // 創建粒子連線效果 - 封裝在 createParticles 函數內
        function createParticleConnections(container) {
            const particles = container.querySelectorAll('div[style*="position: absolute"]');
            const connections = [];
            
            function updateConnections() {
                // 清除舊連線
                connections.forEach(conn => conn.remove());
                connections.length = 0;
                
                // 創建新連線
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p1 = particles[i];
                        const p2 = particles[j];
                        
                        const rect1 = p1.getBoundingClientRect();
                        const rect2 = p2.getBoundingClientRect();
                        
                        const distance = Math.sqrt(
                            Math.pow(rect1.left - rect2.left, 2) + 
                            Math.pow(rect1.top - rect2.top, 2)
                        );
                        
                        // 只連接距離較近的粒子 - 自定義設定
                        if (distance < 157 && Math.random() < 0.2) {
                            const connection = document.createElement('div');
                            connection.className = 'particle-connection';
                            
                            const angle = Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left);
                            const left = rect1.left + rect1.width / 2;
                            const top = rect1.top + rect1.height / 2;
                            
                            connection.style.cssText = `
                                left: ${left}px;
                                top: ${top}px;
                                width: ${distance}px;
                                transform: rotate(${angle}rad);
                            `;
                            
                            container.appendChild(connection);
                            connections.push(connection);
                        }
                    }
                }
            }
            
            // 定期更新連線 - 延長更新間隔讓連線保持更久
            setInterval(updateConnections, 4000);
            updateConnections();
        }

        // 創建多層粒子效果 - 自定義版本
        createParticleLayer(particleContainer, 55, 1.9, 0.8, '#3b82f6', 15, 25); // 小粒子
        createParticleLayer(particleContainer, 28, 3, 0.7, '#1e3a8a', 20, 30); // 中粒子
        createParticleLayer(particleContainer, 14, 5, 0.6, '#60a5fa', 25, 35); // 大粒子

        // 添加粒子連線效果
        createParticleConnections(particleContainer);

        // 添加高質感動畫樣式
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatUp {
                0% { 
                    transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.5); 
                    opacity: 0; 
                }
                10% { 
                    opacity: 0.8; 
                    transform: translateY(90vh) translateX(${Math.random() * 20 - 10}px) rotate(45deg) scale(1);
                }
                50% { 
                    opacity: 1; 
                    transform: translateY(50vh) translateX(${Math.random() * 40 - 20}px) rotate(180deg) scale(1.2);
                }
                90% { 
                    opacity: 0.8; 
                    transform: translateY(10vh) translateX(${Math.random() * 20 - 10}px) rotate(315deg) scale(1);
                }
                100% { 
                    transform: translateY(-10vh) translateX(0) rotate(360deg) scale(0.5); 
                    opacity: 0; 
                }
            }
            
            @keyframes floatDown {
                0% { 
                    transform: translateY(-10vh) translateX(0) rotate(0deg) scale(0.5); 
                    opacity: 0; 
                }
                10% { 
                    opacity: 0.6; 
                    transform: translateY(0vh) translateX(${Math.random() * 15 - 7.5}px) rotate(-45deg) scale(1);
                }
                50% { 
                    opacity: 0.8; 
                    transform: translateY(50vh) translateX(${Math.random() * 30 - 15}px) rotate(-180deg) scale(1.1);
                }
                90% { 
                    opacity: 0.6; 
                    transform: translateY(90vh) translateX(${Math.random() * 15 - 7.5}px) rotate(-315deg) scale(1);
                }
                100% { 
                    transform: translateY(110vh) translateX(0) rotate(-360deg) scale(0.5); 
                    opacity: 0; 
                }
            }
            
            @keyframes floatLeft {
                0% { 
                    transform: translateX(100vw) translateY(0) rotate(0deg) scale(0.3); 
                    opacity: 0; 
                }
                20% { 
                    opacity: 0.4; 
                    transform: translateX(80vw) translateY(${Math.random() * 20 - 10}px) rotate(90deg) scale(0.8);
                }
                50% { 
                    opacity: 0.6; 
                    transform: translateX(50vw) translateY(${Math.random() * 40 - 20}px) rotate(180deg) scale(1);
                }
                80% { 
                    opacity: 0.4; 
                    transform: translateX(20vw) translateY(${Math.random() * 20 - 10}px) rotate(270deg) scale(0.8);
                }
                100% { 
                    transform: translateX(-10vw) translateY(0) rotate(360deg) scale(0.3); 
                    opacity: 0; 
                }
            }
            
            @keyframes floatRight {
                0% { 
                    transform: translateX(-10vw) translateY(0) rotate(0deg) scale(0.3); 
                    opacity: 0; 
                }
                20% { 
                    opacity: 0.4; 
                    transform: translateX(20vw) translateY(${Math.random() * 20 - 10}px) rotate(-90deg) scale(0.8);
                }
                50% { 
                    opacity: 0.6; 
                    transform: translateX(50vw) translateY(${Math.random() * 40 - 20}px) rotate(-180deg) scale(1);
                }
                80% { 
                    opacity: 0.4; 
                    transform: translateX(80vw) translateY(${Math.random() * 20 - 10}px) rotate(-270deg) scale(0.8);
                }
                100% { 
                    transform: translateX(110vw) translateY(0) rotate(-360deg) scale(0.3); 
                    opacity: 0; 
                }
            }
            
            .particle-connection {
                position: absolute;
                height: 1px;
                background: rgba(59, 130, 246, 0.6);
                transform-origin: left center;
                opacity: 0;
                animation: connectionPulse 6s ease-in-out infinite;
            }
            
            @keyframes connectionPulse {
                0%, 20% { opacity: 0; }
                30%, 70% { opacity: 0.8; }
                80%, 100% { opacity: 0; }
            }
            
            .particle-glow {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(30, 58, 138, 0.3) 50%, transparent 70%);
                filter: blur(3px);
                animation: glowPulse 4s ease-in-out infinite;
            }
            
            @keyframes glowPulse {
                0%, 100% { 
                    transform: scale(1); 
                    opacity: 0.5; 
                }
                50% { 
                    transform: scale(2.5); 
                    opacity: 0.9; 
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }


    // 啟動粒子效果
    createParticles();
    
    // 添加動態背景效果
    createDynamicBackground();
    
    // 性能優化：根據設備性能調整粒子數量
    function optimizeParticles() {
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                              /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowEndDevice) {
            // 低端設備減少粒子數量
            const existingParticles = document.querySelectorAll('.particles > div');
            existingParticles.forEach((particle, index) => {
                if (index > 50) { // 只保留前50個粒子
                    particle.style.display = 'none';
                }
            });
        }
    }
    
    // 創建動態背景效果
    function createDynamicBackground() {
        const backgroundContainer = document.createElement('div');
        backgroundContainer.className = 'dynamic-background';
        backgroundContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -3;
            overflow: hidden;
        `;
        document.body.appendChild(backgroundContainer);
        
        // 創建浮動光點
        for (let i = 0; i < 15; i++) {
            const lightSpot = document.createElement('div');
            lightSpot.className = 'light-spot';
            lightSpot.style.cssText = `
                position: absolute;
                width: ${Math.random() * 200 + 100}px;
                height: ${Math.random() * 200 + 100}px;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: lightFloat ${Math.random() * 20 + 20}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            backgroundContainer.appendChild(lightSpot);
        }
        
        // 添加光點動畫樣式
        const lightStyle = document.createElement('style');
        lightStyle.textContent = `
            @keyframes lightFloat {
                0%, 100% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: 0.3; 
                }
                25% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2); 
                    opacity: 0.6; 
                }
                50% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8); 
                    opacity: 0.4; 
                }
                75% { 
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1); 
                    opacity: 0.5; 
                }
            }
        `;
        document.head.appendChild(lightStyle);
    }
    
    // 啟動性能優化
    optimizeParticles();
    
    // 初始化hero section為active狀態
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.add('active');
    }

    // 性能優化：節流滾動事件
    let performanceTicking = false;
    function updateOnScroll() {
        if (!performanceTicking) {
            requestAnimationFrame(function() {
                // 滾動相關的動畫邏輯
                performanceTicking = false;
            });
            performanceTicking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    // 響應式導航
    function handleResize() {
        const nav = document.querySelector('.nav-menu');
        const header = document.querySelector('.header .container');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '☰';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    color: #00ffff;
                    font-size: 24px;
                    cursor: pointer;
                    display: block;
                `;
                header.appendChild(toggle);
                
                toggle.addEventListener('click', function() {
                    nav.classList.toggle('mobile-open');
                });
            }
        } else {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.remove();
            }
            nav.classList.remove('mobile-open');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始檢查
});
