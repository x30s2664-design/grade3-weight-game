# 三年級重量遊戲｜第一段

這是一個適合平板操作的重量概念遊戲。

## 第一段玩法

- 直接按住物品圖片。
- 物品越重，需要越久才能「舉起」。
- 舉起後拖到秤盤。
- 物品越重，拖曳最大速度越慢。
- 放錯時，不用按叉叉，直接把秤盤上的圖片拖回物品區。
- 達成指定總重量即可過關。

## 拖曳公式

```text
v(w) = max(200, 1160 - 1.6w)  px/s
```

其中：

- `w`：物品重量（g）
- `v`：物品最大拖曳速度（px/s）

每個動畫畫面的實際位移：

```text
step = min(distance, v × Δt)
```

這樣不同更新率的平板上，拖曳速度仍會比較一致。

目前設定：

| 重量 | 最大拖曳速度 |
|---:|---:|
| 100 g | 1000 px/s |
| 200 g | 840 px/s |
| 300 g | 680 px/s |
| 400 g | 520 px/s |
| 500 g | 360 px/s |
| 600 g | 200 px/s |

## 執行方式

直接用瀏覽器開啟 `index.html` 即可。

## 放到 GitHub Pages

1. 建立一個 GitHub repository，例如 `grade3-weight-game`。
2. 把 `index.html` 與 `README.md` 上傳到 repository 根目錄。
3. 到 GitHub repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇從 branch 發佈。
5. 選擇 `main` branch 與 `/ (root)`。

之後 GitHub Pages 就會提供遊戲網址。

## 下一步

後續可以繼續加入第二段、第三段關卡，而不需要重做第一段。
