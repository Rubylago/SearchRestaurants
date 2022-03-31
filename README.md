# 尋找餐廳

本專案提供特定餐廳資料搜尋

## 基本功能
。使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
  其中 email 與密碼是必填欄位，但名字不是
  如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
  使用者也可以透過 Facebook Login 直接登入

。使用者必須登入才能使用餐廳清單，
  如果沒登入，會被導向登入頁面

。登入後，使用者可以建立並管理專屬他的一個餐廳清單
  使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息

。使用者可以在首頁看到所有餐廳與它們的簡單資料：
  餐廳照片、餐廳名稱、餐廳分類、餐廳評分

。使用者可以再點進去看餐廳的詳細資訊：
  類別、地址、電話、描述、圖片

。使用者可以透過搜尋餐廳名稱來找到特定的餐廳

。使用者可以透過搜尋餐廳類別來找到特定的餐廳

。使用者可以新增一家餐廳

。使用者可以瀏覽一家餐廳的詳細資訊

。使用者可以瀏覽全部所有餐廳

。使用者可以修改一家餐廳的資訊

。使用者可以刪除一家餐廳


### Installing

Clone the repo

Open the project's root directory

Use npm to install dependencies

```
npm install
```

Run the project

```
npm run dev
```

That's it, now the app should be running on http://localhost:3000

## 使用工具

Visual Studio Code - 開發環境

Express - 應用程式架構

Express-Handlebars - 模板引擎
