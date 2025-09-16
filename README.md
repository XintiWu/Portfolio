# HW1: Chloe Wu's Interactive Portfolio

## 🎬 Demo 影片介紹
[**👉點擊直接看網站遊戲玩法👈**](https://drive.google.com/file/d/1Pcmo4PZaeC8BQG0yMXAycfI5e8g_eDH1/view?usp=sharing)

## 線上網站
直接點擊：[https://xintiwu.github.io/portfolio/](https://xintiwu.github.io/portfolio/)
(圖片載入可能需稍候)

## ⚡ 快速開始

### ⚠️ 重要：啟動方式

**必須使用本地伺服器啟動才能正常顯示 3D 模型，不能直接開啟HTML檔案！**

```bash
# 1. 安裝 http-server
npm install -g http-server

# 2. 在 hw1 目錄執行（一定要有這一步）
cd wp1141/hw1
http-server -p 8080

# 3. 在瀏覽器開啟
# http://localhost:8080/index.html
```


⚠️ **注意**：由於瀏覽器安全限制，必須使用本地伺服器才能正常顯示 3D 模型！

---

## 網頁設計概念與內容

### 📱 頁面結構

### **1.主頁 (index.html)**
1. **Hero Section** - 個人介紹與 3D 遊戲機展示
2. **Photography Section** - 作品集展示，橫向/直向照片分類
3. **Projects Section** - 專案展示，包含技術標籤
4. **Blog Section** - 文章與筆記展示
5. **Contact Section** - 社群媒體連結

#### 操作說明
| 操作 | 功能 |
|------|------|
| 滑鼠拖拽 | 旋轉3D遊戲機 |
| 滑鼠懸停 | 啟動光效和粒子動畫 |
| 點擊遊戲機 | 切換視角 |
| 右上角開關 | 切換到遊戲模式 |
| ESC | 退出遊戲 |

### **2.遊戲模式 (game_mode.html)**
- 全螢幕 3D 遊戲機體驗
- 互動式遊戲功能
- 等級系統與進度追蹤

#### 操作說明
| 按鍵 | 功能 |
|------|------|
| A / ← | 向左移動 |
| D / → | 向右移動 |
| W / 空白鍵 | 射擊 | 
| G | 切換遊戲模式 |
| 點擊螢幕 | 切換視角 |
| ESC | 退出遊戲 |
| 右下角開關 | 切換到主頁模式 |

### 🎮 互動元素

#### **3D 街機遊戲機**
- **拖動旋轉** - 滑鼠拖拽改變視角
- **點擊互動** - 點擊螢幕啟動遊戲
- **鍵盤控制** - 按 G 鍵切換遊戲模式
- **粒子效果** - 動態視覺回饋

#### **圖片畫廊**
- **分類篩選** - 橫向/直向照片切換
- **滑動導航** - 左右按鈕瀏覽
- **響應式佈局** - 根據螢幕寬度調整顯示數量

#### **動畫效果**
- **平滑過渡** - 所有互動都有流暢的動畫
- **懸停效果** - 按鈕和連結的視覺回饋
- **載入動畫** - 3D 模型載入進度顯示

### 🎯 專案概述
這是一個整合了 Three.js WebGL 3D 渲染技術的互動式遊戲個人作品集網站。

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

---

## 🎯 網站效果

### ✅ 3D 渲染
- 使用 Three.js 實現完整的 3D 場景
- 載入 GLTF 格式的 3D 遊戲機模型
- 實現相機控制和視角切換

### ✅ 互動功能
- 滑鼠拖拽旋轉 3D 模型
- 點擊切換視角模式
- 鍵盤控制遊戲操作

### ✅ 視覺效果
- 粒子系統（350個粒子）
- 動態光照效果
- 懸停動畫和過渡效果

### ✅ 音效系統
- 使用 Web Audio API 動態生成音效
- 按鍵音效、懸停音效、遊戲音效

### ✅ 遊戲邏輯
- 兩種經典街機遊戲（吃豆人、太空侵略者）
- 自動遊戲模式切換
- 通關檢測和顯示

### 🚀 詳細部署與測試

#### **線上預覽**
- **GitHub Pages**：`https://xintiwu.github.io/portfolio/`
- **Demo 影片**：[點擊觀看完整演示](https://drive.google.com/file/d/1Pcmo4PZaeC8BQG0yMXAycfI5e8g_eDH1/view?usp=sharing)

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

---

## 技術規格

- **框架**：原生 JavaScript + Three.js
- **3D 渲染**：WebGL
- **模型格式**：GLTF
- **圖片格式**：JPG, PNG
- **版本控制**：Git

## 聯絡資訊
打不開請私訊我～
- **GitHub**: [XintiWu](https://github.com/XintiWu)
- **LinkedIn**: [Xin-Ti Wu](https://www.linkedin.com/in/xin-ti-wu-20863935b/)
- **Instagram**: [@x.inti_](https://www.instagram.com/x.inti_/)
