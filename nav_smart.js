// 智能導航 - 根據當前版本自動設置連結
document.addEventListener('DOMContentLoaded', function() {
    // 獲取當前版本
    const urlParams = new URLSearchParams(window.location.search);
    const currentVersion = urlParams.get('version') || 'interactive';
    
    console.log('當前版本:', currentVersion);
    
    // 更新所有導航連結
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html' || href === 'index.html?version=interactive') {
            // 更新首頁連結以保持當前版本
            link.setAttribute('href', `index.html?version=${currentVersion}`);
        }
    });
    
    // 更新版本切換按鈕的狀態
    const versionCards = document.querySelectorAll('.version-card');
    versionCards.forEach(card => {
        card.classList.remove('current');
    });
    
    if (currentVersion === 'original') {
        const originalCard = document.getElementById('backup-version');
        if (originalCard) {
            originalCard.classList.add('current');
        }
    } else {
        const interactiveCard = document.getElementById('interactive-version');
        if (interactiveCard) {
            interactiveCard.classList.add('current');
        }
    }
    
    // 更新提示文字
    const arcadeHints = document.querySelectorAll('.arcade-hint');
    if (currentVersion === 'original') {
        // 經典版本提示
        if (arcadeHints.length >= 3) {
            arcadeHints[0].textContent = '機台自動旋轉中';
            arcadeHints[1].textContent = '經典太空侵略者動畫';
            arcadeHints[2].textContent = '拖拽可手動控制';
        }
    } else {
        // 互動版本提示
        if (arcadeHints.length >= 3) {
            arcadeHints[0].textContent = '拖動旋轉遊戲機';
            arcadeHints[1].textContent = '點擊螢幕開始遊戲！';
            arcadeHints[2].textContent = '按 G 切換遊戲模式';
        }
    }
});
