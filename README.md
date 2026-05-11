# 稀奇知識笑一個（靜態網頁 APP）

一個「讓人發笑的稀奇知識」選擇題猜謎小遊戲。**不需要 npm**，直接開檔就能玩。

## 怎麼跑起來

### 方法 A：直接打開

用瀏覽器打開 `index.html` 即可（Chrome / Edge / Safari 皆可）。

> 若你貼了包含外部腳本的廣告碼（例如 AdSense），建議用方法 B 以避免部分瀏覽器的檔案權限限制。

### 方法 B：開本機伺服器（推薦）

在專案資料夾裡執行：

```bash
python3 -m http.server 5173
```

然後打開 `http://localhost:5173/`。

## 如何加入廣告（讓你賺錢）

右上角按 **設定**，在「廣告 HTML」貼上你的廣告片段即可，會套用到上/下兩個版位。

### AdSense 範例（示意）

> 請以你 AdSense 後台提供的 `client` / `slot` 為準。

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 重要注意

- **不要寫誘導點擊**（例如「點一下支持我」），很多廣告平台會判定違規。
- 你貼進去的 HTML 會被直接插入畫面，請只貼**可信任來源**的廣告碼。

## 改題庫

題庫在 `app.js` 的 `QUESTION_BANK`。你可以：

- 增加題目數量
- 改梗、改類別
- 調整每題 choices（建議保持 4 個選項）

