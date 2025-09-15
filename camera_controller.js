// 🎮 沈浸式相機控制器
class CameraController {
    constructor(arcadeMachine) {
        this.arcadeMachine = arcadeMachine;
        this.camera = arcadeMachine.camera;
        this.container = arcadeMachine.container;
        
        console.log('相機控制器初始化:', {
            arcadeMachine: !!arcadeMachine,
            camera: !!this.camera,
            container: !!this.container
        });
        
        // 相機視角定義 - 優化版本
        this.viewModes = {
            overview: {
                name: "總覽視角",
                position: { x: 0, y: 0.5, z: 4 },
                target: { x: 0, y: 0, z: 0 },
                fov: 60,
                description: "觀看整個遊戲機"
            },
            gameplay: {
                name: "遊戲視角", 
                position: { x: 0, y: 0.8, z: 1.2 },
                target: { x: 0, y: 0.4, z: 0 },
                fov: 75,
                description: "沈浸式遊戲體驗"
            }
        };
        
        this.currentViewMode = 'overview';
        this.isTransitioning = false;
        this.transitionDuration = 1500; // 1.5秒過渡
        
        // 遊戲模式粒子效果
        this.gameplayAmbientParticles = null;
        this.gameplayArcadeParticles = null;
        
        this.init();
    }
    
    init() {
        this.setupClickHandler();
        this.createViewModeIndicator();
        this.setupKeyboardControls();
    }
    
    setupClickHandler() {
        // 禁用相機控制器的點擊處理，由 arcade3d.js 處理
        console.log('相機控制器點擊處理已禁用，由 arcade3d.js 處理');
        return;
        
        // 監聽遊戲機點擊事件
        this.container.addEventListener('click', (event) => {
            console.log('相機控制器收到點擊事件');
            if (this.isTransitioning) {
                console.log('正在過渡中，忽略點擊');
                return;
            }
            
            // 檢查是否點擊在遊戲機區域
            const rect = this.container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            console.log(`點擊位置: x=${x}, y=${y}`);
            
            // 如果點擊在遊戲機區域，切換到遊戲視角
            if (this.isClickOnArcade(x, y)) {
                console.log('點擊在遊戲機區域，開始切換視角');
                this.switchToGameplayView();
            } else {
                console.log('點擊不在遊戲機區域');
            }
        });
        
        // 添加觸控支持
        this.container.addEventListener('touchend', (event) => {
            if (this.isTransitioning) return;
            event.preventDefault();
            
            const touch = event.changedTouches[0];
            const rect = this.container.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            if (this.isClickOnArcade(x, y)) {
                this.switchToGameplayView();
            }
        });
    }
    
    isClickOnArcade(x, y) {
        // 檢查點擊是否在遊戲機區域內 - 放寬條件
        const centerX = this.container.clientWidth / 2;
        const centerY = this.container.clientHeight / 2;
        const arcadeWidth = this.container.clientWidth * 0.8; // 擴大寬度
        const arcadeHeight = this.container.clientHeight * 0.9; // 擴大高度
        
        const isInArea = (x >= centerX - arcadeWidth/2 && x <= centerX + arcadeWidth/2 &&
                         y >= centerY - arcadeHeight/2 && y <= centerY + arcadeHeight/2);
        
        console.log(`點擊檢測: x=${x}, y=${y}, centerX=${centerX}, centerY=${centerY}, 在區域內=${isInArea}`);
        return isInArea;
    }
    
    switchToGameplayView() {
        if (this.currentViewMode === 'gameplay') {
            // 如果已經在遊戲視角，切換回總覽
            this.switchViewMode('overview');
        } else {
            // 切換到遊戲視角
            this.switchViewMode('gameplay');
        }
    }
    
    switchViewMode(targetMode) {
        console.log(`嘗試切換到視角: ${targetMode}, 當前視角: ${this.currentViewMode}`);
        
        if (!this.camera) {
            console.error('相機對象不存在，無法切換視角');
            return;
        }
        
        if (this.isTransitioning || this.currentViewMode === targetMode) {
            console.log('跳過切換：正在過渡中或已是目標視角');
            return;
        }
        
        console.log('開始視角切換動畫');
        console.log('當前相機位置:', this.camera.position);
        this.isTransitioning = true;
        const startTime = Date.now();
        
        const startMode = this.viewModes[this.currentViewMode];
        const endMode = this.viewModes[targetMode];
        
        // 播放切換音效
        this.playTransitionSound();
        
        // 只在非主頁顯示切換提示
        if (!this.isMainPage()) {
            this.showTransitionMessage(targetMode);
        }
        
        // 開始平滑過渡
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.transitionDuration, 1);
            
            // 使用緩動函數讓過渡更自然
            const easeProgress = this.easeInOutCubic(progress);
            
            // 插值相機位置
            this.camera.position.x = this.lerp(startMode.position.x, endMode.position.x, easeProgress);
            this.camera.position.y = this.lerp(startMode.position.y, endMode.position.y, easeProgress);
            this.camera.position.z = this.lerp(startMode.position.z, endMode.position.z, easeProgress);
            
            // 插值視野角度
            this.camera.fov = this.lerp(startMode.fov, endMode.fov, easeProgress);
            this.camera.updateProjectionMatrix();
            
            // 讓相機看向目標點
            this.lookAtTarget(endMode.target, easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isTransitioning = false;
                this.currentViewMode = targetMode;
                this.onViewModeChanged(targetMode);
            }
        };
        
        animate();
    }
    
    lookAtTarget(target, progress) {
        // 計算相機應該看向的方向
        const targetPosition = new THREE.Vector3(target.x, target.y, target.z);
        const cameraPosition = this.camera.position;
        
        // 使用 THREE.js 的 lookAt 方法
        this.camera.lookAt(targetPosition);
    }
    
    lerp(start, end, progress) {
        return start + (end - start) * progress;
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (this.isTransitioning) return;
            
            switch(event.code) {
                case 'KeyV':
                    // V 鍵切換視角
                    this.cycleViewModes();
                    break;
                case 'Escape':
                    // ESC 鍵回到總覽視角
                    if (this.currentViewMode !== 'overview') {
                        this.switchViewMode('overview');
                    }
                    break;
            }
        });
    }
    
    cycleViewModes() {
        const modes = ['overview', 'gameplay'];
        const currentIndex = modes.indexOf(this.currentViewMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        this.switchViewMode(modes[nextIndex]);
    }
    
    createViewModeIndicator() {
        this.viewModeIndicator = document.createElement('div');
        this.viewModeIndicator.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #3b82f6;
            border-radius: 10px;
            padding: 10px 15px;
            color: white;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            z-index: 1000;
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        this.container.appendChild(this.viewModeIndicator);
        this.updateViewModeIndicator();
    }
    
    updateViewModeIndicator() {
        const mode = this.viewModes[this.currentViewMode];
        this.viewModeIndicator.innerHTML = `
            <div style="color: #3b82f6; font-weight: bold;">📹 ${mode.name}</div>
            <div style="color: #ccc; font-size: 10px;">${mode.description}</div>
            <div style="color: #666; font-size: 9px; margin-top: 5px;">
                V: 切換視角 | ESC: 總覽
            </div>
        `;
    }
    
    showTransitionMessage(targetMode) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #3b82f6;
            border-radius: 15px;
            padding: 20px 30px;
            color: white;
            font-family: 'Orbitron', monospace;
            font-size: 18px;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
            animation: fadeInOut 1.5s ease;
        `;
        
        const mode = this.viewModes[targetMode];
        message.innerHTML = `
            <div style="color: #3b82f6; margin-bottom: 10px;">🎮 ${mode.name}</div>
            <div style="font-size: 14px; color: #ccc;">${mode.description}</div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 1500);
    }
    
    onViewModeChanged(mode) {
        // 只在非主頁更新視角指示器
        if (!this.isMainPage()) {
            this.updateViewModeIndicator();
        }
        
        // 根據視角模式調整其他元素
        if (mode === 'gameplay') {
            this.enterGameplayMode();
        } else if (mode === 'overview') {
            this.exitGameplayMode();
        }
        
        // 觸發自定義事件
        const event = new CustomEvent('cameraViewChanged', {
            detail: { mode: mode, viewMode: this.viewModes[mode] }
        });
        document.dispatchEvent(event);
    }
    
    enterGameplayMode() {
        // 進入遊戲視角時的額外效果
        // 只在非主頁顯示視角指示器
        if (!this.isMainPage()) {
            this.viewModeIndicator.style.opacity = '1';
        }
        
        // 添加遊戲模式樣式
        document.body.classList.add('gameplay-mode');
        
        // 只在非主頁顯示遊戲控制提示
        if (!this.isMainPage()) {
            this.showGameplayHints();
        }
        
        console.log('🎮 進入遊戲視角 - 保持當前粒子效果');
    }
    
    exitGameplayMode() {
        // 退出遊戲視角
        document.body.classList.remove('gameplay-mode');
        this.hideGameplayHints();
        
        console.log('🏠 退出遊戲視角 - 保持當前粒子效果');
    }
    
    showGameplayHints() {
        const hints = document.createElement('div');
        hints.className = 'gameplay-hints';
        hints.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff00;
            border-radius: 10px;
            padding: 15px;
            color: white;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        hints.innerHTML = `
            <div style="color: #00ff00; font-weight: bold; margin-bottom: 8px;">🎮 遊戲控制</div>
            <div>A/D 或 ←/→ : 移動</div>
            <div>W 或 空白鍵 : 跳躍</div>
            <div>G : 切換遊戲模式</div>
            <div>ESC : 退出遊戲視角</div>
        `;
        
        document.body.appendChild(hints);
    }
    
    hideGameplayHints() {
        const hints = document.querySelector('.gameplay-hints');
        if (hints) {
            hints.remove();
        }
    }
    
    isMainPage() {
        // 檢查是否在主頁
        const currentPage = window.location.pathname;
        return currentPage.endsWith('index.html') || currentPage.endsWith('/') || currentPage === '';
    }
    
    createGameplayParticles() {
        // 創建 3D 遊戲模式背景粒子效果
        if (!this.arcadeMachine || !this.arcadeMachine.scene) {
            console.error('無法創建遊戲模式粒子：場景未初始化');
            return;
        }
        
        // 創建環境粒子效果（類似 simple_camera_test.html 中的效果）
        this.createGameplayAmbientParticles();
        
        // 創建遊戲機周圍粒子效果
        this.createGameplayArcadeParticles();
        
        console.log('🎮 3D 遊戲模式背景粒子效果已創建');
    }
    
    createGameplayAmbientParticles() {
        // 創建彩色環境粒子效果（遊戲模式專用）
        const particleCount = 300; // 增加粒子數量
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // 隨機位置 - 更大的範圍
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
            
            // 隨機顏色（彩色方塊效果）
            const colorChoice = Math.random();
            if (colorChoice < 0.25) {
                colors[i3] = 1.0; colors[i3 + 1] = 1.0; colors[i3 + 2] = 0.2; // 黃色
            } else if (colorChoice < 0.5) {
                colors[i3] = 1.0; colors[i3 + 1] = 0.2; colors[i3 + 2] = 1.0; // 紫色
            } else if (colorChoice < 0.75) {
                colors[i3] = 0.2; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1.0; // 青色
            } else {
                colors[i3] = 1.0; colors[i3 + 1] = 0.5; colors[i3 + 2] = 0.2; // 橙色
            }
            
            // 隨機大小
            sizes[i] = Math.random() * 0.3 + 0.1;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        this.gameplayAmbientParticles = new THREE.Points(particles, particleMaterial);
        this.arcadeMachine.scene.add(this.gameplayAmbientParticles);
        
        console.log('🌈 遊戲模式彩色環境粒子創建完成');
    }
    
    createGameplayArcadeParticles() {
        // 創建遊戲機周圍的粒子系統（完全複製 simple_camera_test.html 中的效果）
        const particleCount = 150;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // 圍繞遊戲機的環形分佈
            const radius = 2 + Math.random() * 3;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 4;
            
            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = height;
            positions[i3 + 2] = Math.sin(angle) * radius;
            
            // 隨機顏色（霓虹色系）
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i3] = 0.2; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1.0; // 青色
            } else if (colorChoice < 0.66) {
                colors[i3] = 1.0; colors[i3 + 1] = 0.2; colors[i3 + 2] = 1.0; // 紫色
            } else {
                colors[i3] = 1.0; colors[i3 + 1] = 1.0; colors[i3 + 2] = 0.2; // 黃色
            }
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        
        this.gameplayArcadeParticles = new THREE.Points(particles, particleMaterial);
        this.arcadeMachine.scene.add(this.gameplayArcadeParticles);
        
        console.log('🎮 遊戲模式遊戲機粒子創建完成');
    }
    
    removeGameplayParticles() {
        // 移除 3D 粒子效果
        if (this.gameplayAmbientParticles && this.arcadeMachine && this.arcadeMachine.scene) {
            this.arcadeMachine.scene.remove(this.gameplayAmbientParticles);
            this.gameplayAmbientParticles.geometry.dispose();
            this.gameplayAmbientParticles.material.dispose();
            this.gameplayAmbientParticles = null;
        }
        
        if (this.gameplayArcadeParticles && this.arcadeMachine && this.arcadeMachine.scene) {
            this.arcadeMachine.scene.remove(this.gameplayArcadeParticles);
            this.gameplayArcadeParticles.geometry.dispose();
            this.gameplayArcadeParticles.material.dispose();
            this.gameplayArcadeParticles = null;
        }
        
        console.log('🎮 3D 遊戲模式背景粒子效果已移除');
    }
    
    updateGameplayParticles(deltaTime) {
        // 更新遊戲模式粒子動畫
        if (this.gameplayAmbientParticles) {
            this.gameplayAmbientParticles.rotation.y += deltaTime * 0.02;
            this.gameplayAmbientParticles.rotation.x += deltaTime * 0.01;
        }
        
        if (this.gameplayArcadeParticles) {
            this.gameplayArcadeParticles.rotation.y += deltaTime * 0.05;
            this.gameplayArcadeParticles.rotation.x += deltaTime * 0.03;
        }
    }
    
    getCurrentPreset() {
        // 返回當前視角模式的預設信息
        return {
            name: this.currentViewMode,
            ...this.viewModes[this.currentViewMode]
        };
    }
    
    playTransitionSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // 播放切換音效
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('切換音效播放失敗:', error);
        }
    }
}

// 添加必要的CSS動畫
const cameraStyles = document.createElement('style');
cameraStyles.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    .gameplay-mode {
        cursor: crosshair;
    }
    
    /* 移除遊戲視角的螢光邊框效果 */
    /* .gameplay-mode #arcade-container {
        box-shadow: 0 0 50px rgba(0, 255, 0, 0.3);
    } */
    
    /* 遊戲模式粒子動畫 */
    @keyframes floatUp {
        0% { 
            transform: translateY(100vh) translateX(0) rotate(0deg) scale(0.5); 
            opacity: 0; 
        }
        10% { 
            opacity: 0.8; 
            transform: translateY(90vh) translateX(10px) rotate(36deg) scale(1); 
        }
        90% { 
            opacity: 0.8; 
            transform: translateY(10vh) translateX(-10px) rotate(324deg) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(0vh) translateX(0) rotate(360deg) scale(0.5); 
        }
    }
    
    @keyframes floatDown {
        0% { 
            transform: translateY(-100vh) translateX(0) rotate(0deg) scale(0.5); 
            opacity: 0; 
        }
        10% { 
            opacity: 0.8; 
            transform: translateY(-90vh) translateX(-10px) rotate(-36deg) scale(1); 
        }
        90% { 
            opacity: 0.8; 
            transform: translateY(-10vh) translateX(10px) rotate(-324deg) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(0vh) translateX(0) rotate(-360deg) scale(0.5); 
        }
    }
    
    @keyframes floatLeft {
        0% { 
            transform: translateX(100vw) translateY(0) rotate(0deg) scale(0.5); 
            opacity: 0; 
        }
        10% { 
            opacity: 0.8; 
            transform: translateX(90vw) translateY(10px) rotate(36deg) scale(1); 
        }
        90% { 
            opacity: 0.8; 
            transform: translateX(10vw) translateY(-10px) rotate(324deg) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateX(0vw) translateY(0) rotate(360deg) scale(0.5); 
        }
    }
    
    @keyframes floatRight {
        0% { 
            transform: translateX(-100vw) translateY(0) rotate(0deg) scale(0.5); 
            opacity: 0; 
        }
        10% { 
            opacity: 0.8; 
            transform: translateX(-90vw) translateY(-10px) rotate(-36deg) scale(1); 
        }
        90% { 
            opacity: 0.8; 
            transform: translateX(-10vw) translateY(10px) rotate(-324deg) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateX(0vw) translateY(0) rotate(-360deg) scale(0.5); 
        }
    }
    
    @keyframes connectionPulse {
        0%, 100% { 
            opacity: 0.1; 
            transform: scaleX(0.5); 
        }
        50% { 
            opacity: 0.4; 
            transform: scaleX(1); 
        }
    }
    
    .gameplay-particles {
        background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    }
`;
document.head.appendChild(cameraStyles);

// 導出類別
window.CameraController = CameraController;