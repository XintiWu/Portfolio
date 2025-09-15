# Chloe Wu's Interactive Portfolio

## 🎬 Demo 影片
[**點擊觀看完整演示**](https://drive.google.com/file/d/1IYX4VJKDK9VO6yXoeHzSzUxx4XrPfTK0/view)

## ⚡ 快速開始

### 線上預覽
直接點擊：[https://xintiwu.github.io/wp1141/hw1/index.html](https://xintiwu.github.io/wp1141/hw1/index.html)

### 本地運行
```bash
# 下載專案
git clone https://github.com/XintiWu/wp1141.git
cd wp1141/hw1

# 啟動本地伺服器（重要！不能直接開啟 HTML 檔案）
python3 -m http.server 8000

# 在瀏覽器開啟
# http://localhost:8000/index.html
```

⚠️ **注意**：由於瀏覽器安全限制，必須使用本地伺服器才能正常顯示 3D 模型！

---

## 網頁設計概念與內容

### 🎯 專案概述
這是一個整合了 Three.js WebGL 3D 渲染技術的互動式個人作品集網站，結合了現代網頁設計與沉浸式 3D 體驗。

### 🎨 設計理念

#### 1. **科技感與未來感**
- 採用深色主題配色，營造科技感氛圍
- 使用霓虹藍色 (#3b82f6) 作為主要強調色
- 結合發光效果和動畫，創造未來感視覺體驗

#### 2. **互動式 3D 元素**
- 中央放置可互動的 3D 街機遊戲機模型
- 支援滑鼠拖拽旋轉、點擊互動
- 整合粒子效果系統，增強視覺衝擊力

#### 3. **響應式設計**
- 適配各種螢幕尺寸
- 流暢的動畫過渡效果
- 直觀的導航系統

### 🛠️ 技術特色

#### **前端技術**
- **HTML5** - 語義化結構
- **CSS3** - 現代化樣式設計，包含：
  - Flexbox 和 Grid 佈局
  - CSS 動畫和過渡效果
  - 響應式媒體查詢
- **JavaScript ES6+** - 互動功能實現

#### **3D 渲染技術**
- **Three.js** - WebGL 3D 圖形庫
- **GLTF 模型載入** - 高品質 3D 模型渲染
- **相機控制系統** - 流暢的視角切換
- **粒子效果系統** - 動態視覺效果

#### **互動功能**
- **平滑滾動導航** - 單頁應用體驗
- **圖片畫廊** - 橫向/直向照片分類展示
- **遊戲模式切換** - 主頁與遊戲模式無縫切換
- **響應式圖片載入** - 優化載入效能

### 📱 頁面結構

#### **主頁 (index.html)**
1. **Hero Section** - 個人介紹與 3D 遊戲機展示
2. **Photography Section** - 作品集展示，支援橫向/直向照片分類
3. **Projects Section** - 專案展示，包含技術標籤
4. **Blog Section** - 文章與筆記展示
5. **Contact Section** - 社群媒體連結

#### **遊戲模式 (game_mode.html)**
- 全螢幕 3D 遊戲機體驗
- 互動式遊戲功能
- 等級系統與進度追蹤

### 🎮 互動元素

#### **3D 街機遊戲機**
- **拖拽旋轉** - 滑鼠拖拽改變視角
- **點擊互動** - 點擊螢幕啟動遊戲
- **鍵盤控制** - 按 G 鍵切換遊戲模式
- **粒子效果** - 動態視覺回饋

#### **圖片畫廊**
- **分類篩選** - 橫向/直向照片切換
- **滑動導航** - 左右按鈕瀏覽
- **響應式佈局** - 根據螢幕寬度調整顯示數量

### 🎨 視覺設計

#### **色彩方案**
- **主色調**：深色背景 (#1a1a1a, #2d2d2d)
- **強調色**：霓虹藍 (#3b82f6)
- **輔助色**：青綠色 (#4ECDC4)
- **文字色**：白色與灰色階

#### **字體選擇**
- **主字體**：JetBrains Mono (程式碼風格)
- **標題字體**：Orbitron (未來感字體)
- **Google Fonts** 載入，確保跨平台一致性

#### **動畫效果**
- **平滑過渡** - 所有互動都有流暢的動畫
- **懸停效果** - 按鈕和連結的視覺回饋
- **載入動畫** - 3D 模型載入進度顯示

### 📊 效能優化

#### **載入優化**
- **CDN 載入** - Three.js 和字體使用 CDN
- **圖片壓縮** - 適當的圖片尺寸和格式
- **延遲載入** - 3D 模型按需載入

#### **程式碼結構**
- **模組化設計** - 功能分離，易於維護
- **錯誤處理** - 完善的錯誤捕獲和處理
- **效能監控** - 載入時間和渲染效能追蹤

### 🚀 部署與測試

#### **線上預覽**
- **GitHub Pages**：`https://xintiwu.github.io/wp1141/hw1/index.html`
- **Demo 影片**：[點擊觀看完整演示](https://drive.google.com/file/d/1IYX4VJKDK9VO6yXoeHzSzUxx4XrPfTK0/view)

#### **本地運行指南**

⚠️ **重要提醒**：由於瀏覽器安全限制，**不能直接雙擊 `index.html` 開啟**，必須使用本地伺服器！

##### **方法 1：使用 Python（推薦）**
```bash
# 1. 下載專案
git clone https://github.com/XintiWu/wp1141.git
cd wp1141/hw1

# 2. 啟動本地伺服器
python3 -m http.server 8000

# 3. 在瀏覽器開啟
# http://localhost:8000/index.html
```

##### **方法 2：使用 Node.js**
```bash
# 1. 安裝 http-server
npm install -g http-server

# 2. 在 hw1 目錄執行
cd wp1141/hw1
http-server -p 8080

# 3. 在瀏覽器開啟
# http://localhost:8080/index.html
```

##### **方法 3：使用 VS Code Live Server**
1. 安裝 VS Code 的 "Live Server" 擴展
2. 右鍵點擊 `index.html`
3. 選擇 "Open with Live Server"

#### **為什麼需要本地伺服器？**
- **CORS 限制**：瀏覽器阻止 `file://` 協議載入本地資源
- **3D 模型載入**：GLTF 檔案需要 HTTP 協議才能正常顯示
- **圖片載入**：某些瀏覽器會限制本地圖片載入

#### **瀏覽器相容性**
- **現代瀏覽器** - Chrome, Firefox, Safari, Edge
- **WebGL 支援** - 需要 WebGL 1.0 或更高版本
- **行動裝置** - 響應式設計，支援觸控操作

### 🔧 開發工具與流程

#### **版本控制**
- **Git** - 程式碼版本管理
- **GitHub** - 遠端倉庫與協作
- **分支策略** - 功能開發與主分支分離

#### **開發環境**
- **Cursor IDE** - 主要開發環境
- **即時預覽** - 本地開發伺服器
- **除錯工具** - 瀏覽器開發者工具

### 📝 未來規劃

#### **功能擴展**
- [ ] 更多 3D 互動元素
- [ ] 音效系統整合
- [ ] 多語言支援
- [ ] 深色/淺色主題切換

#### **效能提升**
- [ ] 程式碼分割與懶載入
- [ ] 圖片 WebP 格式支援
- [ ] Service Worker 快取策略
- [ ] 更精細的效能監控

---

## 技術規格

- **框架**：原生 JavaScript + Three.js
- **3D 渲染**：WebGL
- **模型格式**：GLTF
- **圖片格式**：JPG, PNG
- **字體**：Google Fonts (JetBrains Mono, Orbitron)
- **部署**：GitHub Pages
- **版本控制**：Git

## 聯絡資訊

- **GitHub**: [XintiWu](https://github.com/XintiWu)
- **LinkedIn**: [Xin-Ti Wu](https://www.linkedin.com/in/xin-ti-wu-20863935b/)
- **Instagram**: [@x.inti_](https://www.instagram.com/x.inti_/)

---

*這個作品集展示了現代網頁開發技術的整合應用，結合了視覺設計、3D 渲染、互動體驗等多個面向，體現了對前端技術的深入理解和創新應用。*
