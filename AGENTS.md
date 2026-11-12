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

1. 先閱讀本文件和既有程式，維持風格及欄位一致。
2. 新增品種先檢查資料是否正確、是否已有相同 ID，再編輯 `data/cats.json`。
3. 沿用共用的卡片和詳情頁，不為每個品種建立新的 HTML。
4. 不任意刪除原有資料或破壞搜尋、篩選及頁面導覽。
5. 圖片缺少時保留預留區；只能使用有適當授權的圖片。
6. 修改後確認 JSON 正確、卡片與詳情連結正常、手機版可用，並簡述修改內容。網站讀取 JSON 需透過本機 HTTP 伺服器或 GitHub Pages 測試。
