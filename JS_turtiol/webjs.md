# 文档对象模型（DOM）
文档对象模型（Document Object Model），简称 DOM，将所有页面内容表示为可以修改的对象。

document 对象是页面的主要“入口点”。我们可以使用它来更改或创建页面上的任何内容。

例如：
    // 将背景颜色修改为红色
    document.body.style.background = "red";

    // 在 1 秒后将其修改回来
    setTimeout(() => document.body.style.background = "", 1000);


# 浏览器对象模型（BOM）
    浏览器对象模型（Browser Object Model），简称 BOM，表示由浏览器（主机环境）提供的用于处理文档（document）之外的所有内容的其他对象。

    例如：

    navigator 对象提供了有关浏览器和操作系统的背景信息。navigator 有许多属性，但是最广为人知的两个属性是：navigator.userAgent —— 关于当前浏览器，navigator.platform —— 关于平台（有助于区分 Windows/Linux/Mac 等）。
    location 对象允许我们读取当前 URL，并且可以将浏览器重定向到新的 URL。