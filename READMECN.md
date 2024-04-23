### 超级强大的打字机 / 流式输出动画

> 文档由 CHATGPT 翻译

> 本 JavaScript 库提供了用户友好且高性能的 **文本动画**，包括打字机效果、流式输出效果和其他样式。

[演示](https://create-advanced-typewriter-animation.vercel.app/) | [NPM](https://www.npmjs.com/package/create-advanced-typewriter-animation)

#### 预览

![截图](https://github.com/wengcan/create-advanced-typewriter-animation/assets/4007458/fdee2a85-da55-47a1-96cd-7459b835e13c)

#### 安装

本项目依赖于 Node.js 和 npm。如果尚未安装，请先在本地安装它们。

```
$ npm i create-advanced-typewriter-animation
```

安装完成后，可以使用 import 或 require 方法导入库。

```
// 使用 ES6 模块
import  createAdvancedTypingAnimation from 'create-advanced-typewriter-animation';
```

// UMD 方式
```
<script src="//unpkg.com/create-advanced-typewriter-animation@0.1.3/dist/umd/bundle.js"></script>
```

然后可以使用 `window.createAdvancedTypingAnimation`。

#### 使用示例：

```
createAdvancedTypingAnimation(document.querySelector('.container'), `
    <writing infinity="true">
        <cursor />
        <typewriter duration='10' mode="1">
        一个超级强大的打字动画插件，用原生 JavaScript 精心打造。它创建了一个迷人的打字机效果，为您的网络项目注入了精致的优雅。
        </typewriter>
    </writing>
`)
```

#### 指令解释：

| 指令         | 描述                                                                                          | 属性                                                                   |
| ------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `<writing>`  | 指定写入块，包含各种子元素（例如 `<cursor>`、`<hideCursor>`、`<typewriter>`、`<moveCursor>`、`<delete>`、`<mask>`、`<clear>`）。      | `infinity`：指定动画是否应该无限循环（`true` 或 `false`）。                   |
| `<cursor>`   | 表示打字光标。在 `<writing>` 块中使用，表示打字应该从哪里开始。                                   | 无                                                                     |
| `<hideCursor>` | 隐藏打字光标。在 `<writing>` 块中使用，用于隐藏光标。                                      | 无                                                                     |
| `<typewriter>` | 表示在动画中打出的一块文本。                                                                      | - `speed`：单位每秒输出字符/单词/句子（参考 mode）个数，数字越大，打字越快。 <br> - `duration`：指定打字效果的总持续时间（如果提供，则覆盖 `speed`）。 <br> - `mode`：打字动画样式（`0`、`1` 或 `2`）： <br>     - `0`：逐字打字。 <br>     - `1`：逐词打字。 <br>     - `2`：逐句打字。 <br> - `className`：用于已打出文本的 CSS 类，可用于为文本的特定部分设置样式。 |
| `<moveCursor>` | 将光标移动指定数量的步骤。                                                                       | - `duration`：光标移动的持续时间。 <br> - `mode`：光标移动样式（`0` 或 `1`）： <br>     - `0`：将光标向后移动。 <br>     - `1`：将光标向前移动。 <br> - `count`：要移动光标的步数。 |
| `<delete>`   | 表示删除效果，其中逐个删除字符。                                                                  | - `duration`：删除效果的持续时间。 <br> - `count`：要删除的字符数。 <br> **注意**：`<delete>` 指令仅在前一个指令中指定了光标时才起作用。 |
| `<delay>`    | 表示动画中的延迟或暂停。                                                                         | `duration`：延迟的持续时间。                                             |
| `<mask>`     | 表示一个遮罩效果，以某种样式显示或隐藏文本。                                                     | - `duration`：遮罩效果的持续时间。 <br> - `color`：遮罩的颜色或渐变。 <br> - `mode`：遮罩样式（`0`、`1` 或 `2`）： <br>     - `0`：逐字遮罩。 <br>     - `1`：逐词遮罩。 <br>     - `2`：逐句遮罩。 |
| `<clear>`    | 清除写入块的内容。                                                                             | 无                                                                     |