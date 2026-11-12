# Meowpedia｜喵星人圖鑑

第九週作業網站初版：`index.html`（首頁與圖鑑）和 `cat.html`（單一品種詳情），目前只有布偶貓資料。

## 本機預覽

本網站會透過 JavaScript 讀取 `data/cats.json`，因此請在專案資料夾使用本機伺服器，**不要直接雙擊 HTML**：

```bash
python -m http.server 8000
```

再前往 `http://localhost:8000/`。也可以直接部署 GitHub Pages。

## 圖片

目前照片全部使用預留區。以後把以下檔案放入 `assets/images/cats/` 就會自動顯示：

- `ragdoll.jpg`：布偶貓卡片與詳情頁

首頁主視覺目前固定為空白預留區（標示 `hero.jpg`），未來如要顯示圖片可再調整首頁 HTML / CSS。

## 擴充品種

在 `data/cats.json` 陣列新增品種物件。`id` 唯一且使用英文小寫與連字號，例如 `maine-coon`。網站會自動顯示卡片，詳情網址為 `cat.html?id=maine-coon`。
