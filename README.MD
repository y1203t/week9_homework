# Meowpedia｜喵星人圖鑑

以繁體中文介紹貓咪品種的靜態網站，包含外觀、個性、生活習性與照顧重點。使用 HTML、CSS、JavaScript 與 JSON，無須建置。

## 網站功能

- 依中英文名稱搜尋、依毛髮類型篩選品種。
- 從首頁卡片進入共用品種詳情頁，閱讀介紹與參考來源。
- 支援手機與桌面排版，圖片缺少或載入失敗時顯示預留區。

## 目前收錄

| 品種 | 英文名稱 | 毛髮類型 | 詳情頁 |
| --- | --- | --- | --- |
| 布偶貓 | Ragdoll | 半長毛 | [認識布偶貓](cat.html?id=ragdoll) |
| 暹羅貓 | Siamese | 短毛 | [認識暹羅貓](cat.html?id=siamese) |

## GitHub Pages

預期展示網址：[Meowpedia 喵星人圖鑑](https://y1203t.github.io/week9_homework/)。

1. 將專案檔案推送到 GitHub 的 `main` 分支，包含 `.nojekyll`、樣式、程式、JSON 與圖片。
2. 開啟儲存庫 **Settings → Pages**。
3. 選擇 **Deploy from a branch → main → /(root)**，儲存並等待部署完成。

`index.html` 是網站入口，`.nojekyll` 用於停用 Jekyll 處理。站內資源使用相對路徑，支援儲存庫子路徑。本機修改須推送並完成部署，才會更新線上網站。

## 檔案結構

```text
├── AGENTS.md                         # AI 修改與擴充規則
├── README.MD                         # 專案使用說明
├── .nojekyll                         # GitHub Pages 靜態檔案設定
├── index.html                        # 首頁、搜尋與圖鑑
├── cat.html                          # 共用品種詳情模板
├── css/style.css                     # 共用樣式
├── js/main.js                        # 資料載入與頁面互動
├── data/cats.json                    # 品種資料
└── assets/images/
    ├── profile/                      # 首頁貓咪照片
    ├── ragdoll/                      # 布偶貓照片
    └── siamese/                      # 暹羅貓照片
```

## 新增品種

請先閱讀 [AGENTS.md](AGENTS.md)。

1. 確認品種名稱，查證介紹與照顧知識。
2. 將圖片放入 `assets/images/<id>/<id>.<副檔名>`，保留實際圖片格式。
3. 在 `data/cats.json` 新增一筆物件，沿用既有欄位，使用唯一的英文小寫及連字號 ID。
4. 填寫 `image`、`imageAlt` 與 `sources`；沒有圖片時，`image` 填空字串。
5. 透過 HTTP 檢查卡片、詳情連結、搜尋、篩選、圖片及手機排版。

新增資料後，卡片與 `cat.html?id=<id>` 會由既有程式產生，不需建立新 HTML。首頁主視覺固定使用 `profile/cat.png`，不可換成品種照片。

## 圖片與資料來源

目前使用專案內提供的圖片，不自行生成圖片。新增外部圖片時，須確認使用授權，並在此記錄作者、來源及授權條款。

品種知識的參考網址列於 `data/cats.json` 的 `sources`，並顯示於詳情頁。介紹為一般性資訊，個性與照顧需求因個體而異，健康問題請諮詢獸醫。
