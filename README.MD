# Meowpedia｜喵星人圖鑑

繁體中文貓咪圖鑑，第一版收錄布偶貓。首頁提供中英文名稱搜尋與毛髮類型篩選；`cat.html?id=ragdoll` 使用共用品種模板。

## 本機預覽

在專案目錄執行 `npx --yes http-server . -p 8080`，再開啟 http://localhost:8080 。此指令首次執行需要網路與 Node.js；也可以使用 VS Code Live Server 或 GitHub Pages。請勿直接雙擊 HTML，因為網站需要透過 HTTP 讀取 JSON。

## GitHub Pages 展示

本專案是純靜態網站，不需要 npm 安裝或建置。根目錄的 `index.html` 是展示入口，`.nojekyll` 讓 GitHub Pages 直接提供靜態檔案。CSS、JavaScript、JSON 與詳情連結均採相對路徑，可在儲存庫子路徑下運作。

1. 將專案檔案（包含 `.nojekyll`、`css/`、`js/`、`data/`、`assets/`）提交並推送到 GitHub 的 `main` 分支。
2. 到儲存庫 **Settings → Pages → Build and deployment**。
3. 將 **Source** 設為 **Deploy from a branch**，選擇 **main** 與 **/(root)**，按 **Save**。
4. 等待 GitHub 的 Pages 部署成功，再開啟 https://y1203t.github.io/week9_homework/ 。布偶貓詳情為 https://y1203t.github.io/week9_homework/cat.html?id=ragdoll 。

這是預期展示網址；本機修改不會自動更新線上網站。部署後請確認首頁卡片、搜尋、毛髮篩選、詳情頁及手機瀏覽。若顯示 README 或 404，請檢查發布目錄是否為 `/(root)`，且該分支根目錄有小寫 `index.html`。若顯示資料載入失敗，請確認 `data/cats.json` 已一併推送，且檔名大小寫一致。

設定依據：[GitHub Pages 發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 圖片與授權

首頁主視覺、布偶貓卡片與詳情頁共用 JSON 裡設定的專案既有圖片 `assets/images/ragdoll/ragdoll.png`。新增品種時優先使用使用者提供的圖片，沒有圖片則保留預留區，不自行生成圖片；使用外部圖片時須確認授權。

取得可使用的照片後，統一放入 `assets/images/cats/`，例如 `ragdoll.jpg`，並將 JSON 的 `image` 設為 `assets/images/cats/ragdoll.jpg`，填寫描述性的 `imageAlt`。請在本文件記錄作者、來源與授權條款。`image` 為空字串或圖片載入失敗時會顯示預留區。

`AGENTS.md` 第 6.1 節也指定新增品種可用 `assets/images/<id>/<id>.png`，例如 `assets/images/siamese/siamese.png`；程式同時支援此格式與第 5 節的 `assets/images/cats/` 格式。

## 擴充品種

在 `data/cats.json` 陣列新增一筆物件，完整沿用既有欄位。`tags`、`care`、`sources` 為字串陣列，`id` 必須唯一，使用英文小寫與連字號；`image` 可為空字串。查證照顧知識並將網址填入 `sources`，描述個性時保留個體差異。

新增資料後，共用卡片與詳情頁會自動呈現，不需新增 HTML。請透過 HTTP 確認名稱搜尋、毛髮篩選、空結果、詳情頁、未知 ID、圖片預留區及手機版排版。
