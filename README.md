# Smart Shopper 採買達人
這是一款運用 Phaser 3 框架以 HTML、CSS、Javascript 語言建立網頁 2D 遊戲。
## 遊戲理念
- 青銀共遊 RPG 遊戲
- 以長輩日常的市場採購為發想情境
- 關卡任務符合四項腦力活化指標
## 遊戲玩法
- 鍵盤上下左右鍵操控角色
- 蒐集食物的方法是讓角色觸碰到食物
- 一旦蒐集到關卡要求的目標會顯示「恭喜過關」
- 當蒐集到錯誤的食物就會從關卡一重新開始
- 唯有零失誤才能一路破關成為聰明的採買達人

✨適合長者：整個遊戲過程的入關、換關、重新開始都是自動化操作，玩家只要操控上下左右鍵即可

![image](https://github.com/user-attachments/assets/30e873a1-4ce9-41cd-bf63-d8d2a9db56e3)

## 關卡設計
- 多重題目類型<br>
分為數量認知、外觀認知、知識認知、猜謎與知識解謎，越後面的關卡會混合越多類型在一題當中，也就是難度愈高。
- 青銀共遊<br>
關卡中許多較為需要動腦的題目，像是蛋豆魚肉類、落山風這些知識點，可以讓這款遊戲成為青銀攜手破關的媒介。
- 簡潔明瞭<br>
十個關卡由淺入深，敘述簡單，降低年長的在體驗這款遊戲時的門檻，同時建立成就感，持續遊玩。

![採買達人-whyhugo](https://github.com/user-attachments/assets/3be872f2-eefa-48d5-a61b-6baeb09f6584)

## 腦力活化指標
- 記憶力<br>
在遊戲當中需要蒐集指定數量的食物，不過畫面不會顯示目前的數量，需要的就是記憶力。
- 問題解決<br>
多重類型的關卡題目，舉凡知識性解謎、猜謎、食物類型辨認等。
- 動作力<br>
RPG 遊戲的角色透過鍵盤上下左右鍵操控，依靠玩家的手眼協調能力，才能巧妙的閃避障礙物。
- 視覺空間<br>
在關卡題目當中需要從像素風格元素的輪廓與顏色辨認食物類型，分類食物顏色。此外也要掌握超出畫面 2D 地圖型態。

## 程式說明
運用 Phaser 3 框架以 HTML、CSS、Javascript 語言建立網頁 2D 遊戲。將各個關卡、開始、重新開始與結束畫面的 JS 分成不同檔案來開發，提升開發效率。程式碼略為冗長之處在於食物物件較多，因此需要重複載入與邏輯運算。
- `assets` 資料夾中為遊戲中所使用的美術素材，包含角色、障礙物、場景等
- `js` 資料夾中為遊戲個關卡的程式，`config.js` 用於整體環境屬性設定，`sceneX.js` *1<=X<=10* 為各關卡程式，`successYZ.js` 為各關卡之間的場景轉換，其餘為開始、失敗、結束場景程式
- 
## 美術設計
採用像素風格設計整體遊戲畫面元素與角色。遊戲中的各個元素皆取自於 itch.io 2D 遊戲素材庫，再透過平面繪圖軟體重新調整成程式以及遊戲設計上的內容需求。

## 獲獎
2024 第二屆資策會數位教育研究所樂齡盃遊戲設計學生組 最佳團隊獎（2024 IIIEDU Senior Cup Student Game Design Category – Best Team Award）
