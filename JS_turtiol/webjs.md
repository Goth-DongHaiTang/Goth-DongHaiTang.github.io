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
#  avaScript 来访问 HTML 文档的主干是标签（tag）。

根据文档对象模型（DOM），每个 HTML 标签都是一个对象。嵌套的标签是闭合标签的“子标签（children）”。标签内的文本也是一个对象。

所有这些对象都可以通过 JavaScript 来访问，我们可以使用它们来修改页面。

document.body 是表示 <body> 标签的对象。

document.body.style.background = 'red'; // 将背景设置为红色

setTimeout(() => document.body.style.background = '', 3000); // 恢复回去

setTimeout(){ funtion(){
    doucument.body.style.
}

}



# toggle 切换状态
 比如 function toggleLeftSidebar() {
    // 找到左侧抽屉和遮罩层
    const sidebar = document.getElementById('leftSidebar');
    const overlay = document.getElementById('overlay');
    我们可以看到 DOM 取得组件ID 存为 常量
    // 切换显示/隐藏状态
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    sidebar的classList属性值切换为 active
}

    function toggleSearch() {
        搜索框函数
    const searchContainer = document.getElementById('searchContainer');
        声明 搜索框内容组件 保存为常量
    const searchInput = document.getElementById('searchInput');
        声明 搜索框 保存为常量
    searchContainer.classList.toggle('active');
        搜索框内容的classList属性 改为active
    if (searchContainer.classList.contains('active')) {

        如果 搜索框内容 的属性是
        searchInput.focus(); // 自动聚焦到搜索框
    } else {
        searchInput.value = ''; // 清空搜索内容
        clearSearch(); // 取消高亮
    }
}
