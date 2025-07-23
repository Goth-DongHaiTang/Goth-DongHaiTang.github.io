import {main} from "./main.js"
好的！我来通俗易懂地解释一下这个JavaScript代码，它主要控制网页上的各种交互功能：

🚪 抽屉控制功能
javascript的
function toggleLeftSidebar() {
    // 找到左侧抽屉和遮罩层
    const sidebar = document.getElementById('leftSidebar');
    const overlay = document.getElementById('overlay');
    
    // 切换显示/隐藏状态
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}
简单理解：就像开关灯一样，点一下按钮，左侧抽屉就滑出来；再点一下，就滑回去。就是"切换"的意思。toggle

🔍 搜索功能
javascript的
function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus(); // 自动聚焦到搜索框
    } else {
        searchInput.value = ''; // 清空搜索内容
        clearSearch(); // 取消高亮
    }
}
简单理解：

点击搜索按钮 → 搜索框出现，光标自动跳到搜索框里
再点一下 → 搜索框消失，搜索内容被清空
javascript的
function searchContent() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resources = document.querySelectorAll('.boxResource');
    
    // 先清除之前的高亮
    clearSearch();
    
    // 如果搜索框是空的，就不搜索
    if (query.trim() === '') return;
    
    // 遍历每个资源卡片
    resources.forEach(resource => {
        const keywords = resource.getAttribute('data-keywords').toLowerCase();
        const brief = resource.querySelector('.brief').textContent.toLowerCase();
        
        // 如果关键词或描述包含搜索内容
        if (keywords.includes(query) || brief.includes(query)) {
            resource.classList.add('highlight'); // 高亮显示
            resource.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 滚动到这个位置
        }
    });
}
简单理解：

获取你输入的搜索词
在每个卡片的关键词和描述中查找
找到匹配的就用黄色边框高亮，并自动滚动到那个位置
🎨 主题切换功能
javascript的
function setTheme(theme) {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // 先把所有主题样式都删掉
    body.classList.remove('dark-theme', 'light-theme', 'warm-theme');
    themeButtons.forEach(btn => btn.classList.remove('active'));
    
    // 如果不是默认主题，就添加对应的样式
    if (theme !== 'default') {
        body.classList.add(`${theme}-theme`);
    }
    
    // 给对应的按钮加上"已选中"的标记
    document.querySelector(`.theme-btn.${theme}`).classList.add('active');
    
    // 把用户的选择保存到浏览器里
    localStorage.setItem('theme', theme);
}
简单理解：

清除当前的颜色主题
应用新选择的主题（改变背景色）
在选中的主题按钮上显示✓号
把选择记住，下次打开网页还是这个主题
🖱️ 点击和键盘操作
javascript的
// 点击遮罩层关闭抽屉
document.getElementById('overlay').addEventListener('click', function() {
    // 关闭所有打开的抽屉
    document.getElementById('leftSidebar').classList.remove('active');
    document.getElementById('rightSidebar').classList.remove('active');
    this.classList.remove('active');
});
简单理解：点击抽屉外面的灰色区域，抽屉就会自动关闭（就像手机App那样）。

javascript的
// 键盘快捷键
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault(); // 阻止浏览器默认的查找功能
        toggleSearch(); // 用我们自己的搜索
    }
    if (e.key === 'Escape') {
        // ESC键关闭所有东西
        // ... 关闭抽屉、搜索等
    }
});
简单理解：

按 → 打开搜索功能Ctrl + F
按 → 关闭所有打开的抽屉和搜索ESC
🔄 页面加载时的初始化
javascript
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
});
简单理解：网页加载完成后，检查上次用户选择的主题，然后自动应用。如果是第一次访问，就用默认主题。

总结：这个JavaScript就像网页的"大脑"，负责：

控制抽屉的开关
处理搜索功能
管理主题切换
响应用户的点击和键盘操作
记住用户的偏好设置
就像遥控器控制电视一样，这些代码让网页能够响应用户的各种操作！





