# AGENTS.md — Meowpedia 喵星人圖鑑

## 1. 專案目的

Meowpedia 是一個以繁體中文介紹貓咪品種的圖鑑網站，包含外觀、個性、生活習性及照顧重點。第一版只收錄布偶貓，未來讓 AI 按照相同格式新增其他品種。

## 2. 網頁整體風格

網站採可愛、溫暖、簡潔的療癒風格。配色：奶油白 `#F8F4EE`、蜜桃粉 `#EFCFD1`、鼠尾草綠 `#BAC8B5`、深咖灰 `#514C49`。使用圓角卡片、柔和陰影與留白。全站繁體中文，品種保留英文名稱，版型需適用手機和桌面。圖片尚未提供時顯示預留區；不得使用授權不明的圖片。

## 3. 頁面結構

- `index.html`：網站簡介、全部品種卡片、名稱搜尋與毛髮類型篩選。
- `cat.html`：共用品種介紹模板，從 URL `id` 參數讀取資料，例如 `cat.html?id=ragdoll`。

兩頁共用樣式與導覽列，均使用一般上下捲動方式閱讀。不另設 `about.html` 或 `cats.html`。

## 4. 新增內容格式

品種資料統一儲存於 `data/cats.json` 陣列，每筆資料沿用布偶貓的相同欄位：`id`、`name`、`englishName`、`origin`、`coat`、`tags`、`summary`、`appearance`、`personality`、`habits`、`care`、`image`、`imageAlt`、`sources`。其中 `tags`、`care`、`sources` 為陣列。新增品種只需新增一筆物件，不能重複 `id`。照顧知識需查證，個性描述避免以偏概全，資料來源放入 `sources`。

## 5. 檔案命名與放置

```text
meowpedia/
├── AGENTS.md
├── index.html
├── cat.html
├── css/style.css
├── js/main.js
├── data/cats.json
└── assets/images/cats/
```

名稱使用英文小寫及連字號，例如 `maine-coon`、`maine-coon.jpg`。圖片統一放在 `assets/images/cats/`。

## 6. AI 修改或新增內容的規則

AI 在修改網站前，必須先閱讀 `AGENTS.md` 及現有程式碼，了解網站架構與資料格式，並遵守以下規則。

### 6.1 新增貓咪品種

當使用者要求新增一種貓咪時，依照以下步驟進行：

1. **確認品種資料**
   - 查詢貓咪的中英文名稱、原產地、外觀、個性、生活習性及照顧方式。
   - 確認 `data/cats.json` 中沒有相同的品種 ID。
   - 使用可靠來源，避免編造資料。

2. **新增圖片檔案**
   - 在 `assets/images/` 下建立以品種 ID 命名的資料夾，例如 `assets/images/siamese/`。
   - 將圖片命名為 `siamese.png`，完整路徑為 `assets/images/siamese/siamese.png`。
   - 若尚未提供圖片，保留預設圖片區塊，不得使用授權不明的圖片。

3. **修改 `data/cats.json`**
   - 保留原本的貓咪資料，在 JSON 陣列中新增一筆品種資料。
   - 新資料必須使用與布偶貓相同的欄位格式。
   - `id` 必須唯一，`image` 填入圖片的相對路徑，例如 `assets/images/siamese/siamese.png`。
   - 不得刪除或更改其他品種的資料。

4. **更新網站顯示**
   - `index.html`：應透過 JavaScript 自動讀取 JSON 並產生新卡片，原則上不需修改 HTML。
   - `cat.html`：根據網址中的品種 ID 顯示對應資料，例如 `cat.html?id=siamese`，不需建立新的 HTML 頁面。
   - `js/main.js`：沿用原有的資料讀取、卡片生成及詳情顯示功能，只有功能不足時才修改。
   - `css/style.css`：沿用現有的配色與卡片樣式，新增品種時不需修改。

### 6.2 修改既有網站

當使用者要求修改網頁功能或介面時：

1. 先確認需要修改的檔案，不得無故重寫整個網站。
2. 修改畫面樣式時，優先調整 `css/style.css`。
3. 修改搜尋、分類、圖片顯示等功能時，調整 `js/main.js`。
4. 修改貓咪介紹內容時，只更新 `data/cats.json`。
5. 修改頁面結構時，才調整 `index.html` 或 `cat.html`。
6. 保留原有配色、導覽列及頁面風格，不得任意刪除既有功能。

### 6.3 修改後檢查

每次新增或修改完成後，必須確認：

1. `cats.json` 格式正確，沒有重複 ID。
2. 新貓咪能正常顯示在首頁圖鑑中。
3. 點擊卡片能進入正確的品種介紹頁。
4. 圖片路徑正確，沒有圖片時顯示預留區。
5. 原本的搜尋、分類及頁面導覽功能正常。
6. 電腦與手機版均能正常瀏覽。

網站應使用本機 HTTP 伺服器或 GitHub Pages 測試。
完成後，AI 必須簡單說明新增或修改了哪些檔案、修改內容，以及檢查結果。
