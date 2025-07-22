// Gallery 资源管理器
class GalleryManager {
    constructor(gallerySelector = '.gallery') {
        this.gallery = document.querySelector(gallerySelector);
        this.storageKey = 'gothweb_gallery_items';
        this.autoSave = true; // 默认开启自动保存
        this.init();
    }

    init() {
        if (!this.gallery) {
            console.error('日志：未找到展览中的容器栏!');
            return;
        }
        
        // 从本地存储加载数据
        this.loadFromStorage();
        console.log('日志：✅ 展览在本地存储初始化成功');
    }

    /**
     * 保存到本地存储
     */
    saveToStorage() {
        const items = this.getAllItems();
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(items));
            console.log(`日志：✅ 已保存 ${items.length}  元素 到本地存储`);
            return true;
        } catch (error) {
            console.error('日志：❌保存到本地存储失败:', error);
            return false;
        }
    }

    /**
     * 从本地存储加载
     */
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            if (savedData) {
                const items = JSON.parse(savedData);
                // 清空当前内容
                this.gallery.innerHTML = '';
                // 重新加载保存的内容
                this.addItems(items);
                console.log(`日志：✅ 成功从本地加载 ${items.length}  个元素`);
                return true;
            }
        } catch (error) {
            console.error('日志：❌从本地加载失败:', error);
        }
        return false;
    }

    /**
     * 获取当前所有项目数据
     */
    getAllItems() {
        const items = Array.from(this.gallery.querySelectorAll('.boxResource')).map(item => {
            const link = item.querySelector('.boxResourceA');
            const img = item.querySelector('.boxImage');
            const brief = item.querySelector('.brief');
            
            return {
                title: brief.textContent,
                image: img.src,
                link: link.href,
                alt: img.alt,
                category: item.getAttribute('data-category') || ''
            };
        });
        return items;
    }

    /**
     * 清除本地存储
     */
    clearStorage() {
        localStorage.removeItem(this.storageKey);
        console.log('🗑️ 已清除本地存储');
    }

    /**
     * 设置自动保存
     */
    setAutoSave(enabled) {
        this.autoSave = enabled;
        console.log(`自动保存 ${enabled ? '启用' : '未启用'}`);
    }

    /**
     * 触发自动保存
     */
    triggerSave() {
        if (this.autoSave) {
            this.saveToStorage();
        }
    }

    /**
     * 添加单个资源项
     * @param {Object} item - 资源项配置
     * @param {string} item.title - 标题/描述
     * @param {string} item.image - 图片路径
     * @param {string} item.link - 链接地址
     * @param {string} [item.alt] - 图片alt文本
     * @param {number} [item.delay] - 动画延迟（秒）
     */
    addItem(item) {
        const { title, image, link, alt = title, delay = 0 } = item;
        
        if (!title || !image || !link) {
            console.error('日志：缺少: 标题title, 图片image, 链接link');
            return false;
        }

        const article = this.createItemElement(item);
        
        // 添加动画延迟
        if (delay > 0) {
            article.style.animationDelay = `${delay}s`;
        }

        this.gallery.appendChild(article);
        
        // 触发入场动画
        setTimeout(() => {
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, 100);

        // 自动保存
        this.triggerSave();

        return true;
    }

    /**
     * 批量添加资源项
     * @param {Array} items - 资源项数组
     */
    addItems(items) {
        if (!Array.isArray(items)) {
            console.error('日志：加入的元素必须是数组');
            return;
        }

        items.forEach((item, index) => {
            // 自动设置动画延迟
            item.delay = item.delay || index * 0.1;
            this.addItem(item);
        });
    }

    /**
     * 创建资源项 DOM 元素
     */
    createItemElement(item) {
        const { title, image, link, alt = title, category = '' } = item;

        const article = document.createElement('article');
        article.className = 'boxResource';
        article.setAttribute('data-category', category);
        
        // 初始状态（用于动画）
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'all 0.6s ease-out';

        article.innerHTML = `
            <a class="boxResourceA" href="${link}" aria-label="访问${title}">
                <img class="boxImage" src="${image}" alt="${alt}" loading="lazy">
                <p class="brief">${title}</p>
            </a>
        `;

        return article;
    }

    /**
     * 清空所有资源项
     */
    clear() {
        this.gallery.innerHTML = '';
    }

    /**
     * 删除指定索引的资源项
     * @param {number} index - 索引
     */
    removeItem(index) {
        const items = this.gallery.querySelectorAll('.boxResource');
        if (items[index]) {
            // 添加删除动画
            items[index].style.transform = 'scale(0.8)';
            items[index].style.opacity = '0';
            setTimeout(() => {
                items[index].remove();
            }, 300);
            return true;
        }
        return false;
    }

    /**
     * 根据标题删除资源项
     * @param {string} title - 要删除的项目标题
     */
    removeByTitle(title) {
        const items = this.gallery.querySelectorAll('.boxResource');
        let removed = false;
        
        items.forEach(item => {
            const brief = item.querySelector('.brief');
            if (brief && brief.textContent.trim() === title) {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.remove();
                }, 300);
                removed = true;
            }
        });
        
        return removed;
    }

    /**
     * 根据链接删除资源项
     * @param {string} link - 要删除的项目链接
     */
    removeByLink(link) {
        const items = this.gallery.querySelectorAll('.boxResource');
        let removed = false;
        
        items.forEach(item => {
            const linkElement = item.querySelector('.boxResourceA');
            if (linkElement && linkElement.href === link) {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.remove();
                }, 300);
                removed = true;
            }
        });
        
        return removed;
    }

    /**
     * 根据分类删除所有资源项
     * @param {string} category - 要删除的分类
     */
    removeByCategory(category) {
        const items = this.gallery.querySelectorAll('.boxResource');
        let count = 0;
        
        items.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category') || '';
            if (itemCategory === category) {
                // 添加延迟，创建波浪删除效果
                setTimeout(() => {
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.remove();
                    }, 300);
                }, count * 100);
                count++;
            }
        });
        
        return count;
    }

    /**
     * 删除最后一个资源项
     */
    removeLast() {
        const items = this.gallery.querySelectorAll('.boxResource');
        if (items.length > 0) {
            return this.removeItem(items.length - 1);
        }
        return false;
    }

    /**
     * 启用交互式删除模式（点击删除）
     * @param {boolean} enable - 是否启用
     */
    enableClickToDelete(enable = true) {
        const items = this.gallery.querySelectorAll('.boxResource');
        
        if (enable) {
            items.forEach((item, index) => {
                // 添加删除按钮
                if (!item.querySelector('.delete-btn')) {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '×';
                    deleteBtn.style.cssText = `
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        width: 30px;
                        height: 30px;
                        background: rgba(255, 0, 0, 0.8);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        font-size: 18px;
                        font-weight: bold;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                        z-index: 10;
                    `;
                    
                    deleteBtn.onmouseenter = () => {
                        deleteBtn.style.background = 'rgba(255, 0, 0, 1)';
                        deleteBtn.style.transform = 'scale(1.1)';
                    };
                    
                    deleteBtn.onmouseleave = () => {
                        deleteBtn.style.background = 'rgba(255, 0, 0, 0.8)';
                        deleteBtn.style.transform = 'scale(1)';
                    };
                    
                    deleteBtn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.removeItem(index);
                    };
                    
                    item.style.position = 'relative';
                    item.appendChild(deleteBtn);
                }
            });
        } else {
            // 移除删除按钮
            items.forEach(item => {
                const deleteBtn = item.querySelector('.delete-btn');
                if (deleteBtn) {
                    deleteBtn.remove();
                }
            });
        }
    }

    /**
     * 根据分类筛选显示
     * @param {string} category - 分类名称，空字符串显示全部
     */
    filterByCategory(category = '') {
        const items = this.gallery.querySelectorAll('.boxResource');
        
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category') || '';
            
            if (!category || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }

    /**
     * 列出所有资源项（调试用）
     */
    listItems() {
        const items = this.gallery.querySelectorAll('.boxResource');
        const itemList = Array.from(items).map((item, index) => {
            const brief = item.querySelector('.brief');
            const link = item.querySelector('.boxResourceA');
            const category = item.getAttribute('data-category') || '无分类';
            
            return {
                index,
                title: brief.textContent.trim(),
                link: link.href,
                category
            };
        });
        
        console.table(itemList);
        return itemList;
    }

    /**
     * 搜索资源项
     * @param {string} keyword - 搜索关键词
     */
    search(keyword) {
        const items = this.gallery.querySelectorAll('.boxResource');
        const results = [];
        
        items.forEach((item, index) => {
            const brief = item.querySelector('.brief');
            const title = brief.textContent.toLowerCase();
            
            if (title.includes(keyword.toLowerCase())) {
                results.push({
                    index,
                    title: brief.textContent.trim(),
                    element: item
                });
                
                // 高亮搜索结果
                item.style.border = '2px solid #ff6b6b';
                setTimeout(() => {
                    item.style.border = '';
                }, 2000);
            }
        });
        
        console.log(`Found ${results.length} items matching "${keyword}":`, results);
        return results;
    }

    /**
     * 预设的快速添加方法
     */
    addTool(title, image, link) {
        return this.addItem({
            title,
            image,
            link,
            category: 'tool'
        });
    }

    addWebsite(title, image, link) {
        return this.addItem({
            title,
            image,
            link,
            category: 'website'
        });
    }

    addResource(title, image, link) {
        return this.addItem({
            title,
            image,
            link,
            category: 'resource'
        });
    }
}

// 使用示例和快速操作函数
window.addEventListener('DOMContentLoaded', function() {
    // 创建 gallery 管理器实例
    window.galleryManager = new GalleryManager();

    // 全局快捷函数 - 添加
    window.addGalleryItem = function(title, image, link, category = '') {
        return window.galleryManager.addItem({ title, image, link, category });
    };

    window.addMultipleItems = function(items) {
        return window.galleryManager.addItems(items);
    };

    // 全局快捷函数 - 删除
    window.removeGalleryItem = function(index) {
        return window.galleryManager.removeItem(index);
    };

    window.removeByTitle = function(title) {
        return window.galleryManager.removeByTitle(title);
    };

    window.removeByLink = function(link) {
        return window.galleryManager.removeByLink(link);
    };

    window.removeByCategory = function(category) {
        return window.galleryManager.removeByCategory(category);
    };

    window.removeLast = function() {
        return window.galleryManager.removeLast();
    };

    window.clearGallery = function() {
        return window.galleryManager.clear();
    };

    window.enableDeleteMode = function(enable = true) {
        return window.galleryManager.enableClickToDelete(enable);
    };

    // 示例数据（你可以删除这部分）
    const sampleItems = [
        {
            title: "AI 写作助手",
            image: "./res/ai-writer.jpg",
            link: "https://example.com/ai-writer",
            category: "tool"
        },
        {
            title: "设计资源库",
            image: "./res/design-resources.jpg", 
            link: "https://example.com/design",
            category: "resource"
        },
        {
            title: "开发者文档",
            image: "./res/dev-docs.jpg",
            link: "https://example.com/docs",
            category: "website"
        }
    ];

    // 如果你想加载示例数据，取消下面这行的注释
    // window.galleryManager.addItems(sampleItems);
});

// 额外的工具函数
const GalleryUtils = {
    /**
     * 从 JSON 配置加载资源项
     * @param {string} jsonPath - JSON 文件路径
     */
    async loadFromJSON(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            const data = await response.json();
            window.galleryManager.addItems(data.items || data);
            console.log(`Loaded ${data.length || data.items?.length || 0} items from ${jsonPath}`);
        } catch (error) {
            console.error('Failed to load JSON:', error);
        }
    },

    /**
     * 导出当前配置为 JSON
     */
    exportToJSON() {
        const items = Array.from(document.querySelectorAll('.boxResource')).map(item => {
            const link = item.querySelector('.boxResourceA');
            const img = item.querySelector('.boxImage');
            const brief = item.querySelector('.brief');
            
            return {
                title: brief.textContent,
                image: img.src,
                link: link.href,
                alt: img.alt,
                category: item.getAttribute('data-category') || ''
            };
        });

        const dataStr = JSON.stringify({ items }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gallery-config.json';
        link.click();
        
        URL.revokeObjectURL(url);
    },

    /**
     * 创建分类筛选器
     */
    createCategoryFilter() {
        const categories = new Set();
        document.querySelectorAll('.boxResource').forEach(item => {
            const cat = item.getAttribute('data-category');
            if (cat) categories.add(cat);
        });

        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filter';
        filterContainer.style.cssText = `
            text-align: center;
            margin: 1rem 0;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
        `;

        // 全部按钮
        const allBtn = document.createElement('button');
        allBtn.textContent = '全部';
        allBtn.onclick = () => window.galleryManager.filterByCategory('');
        filterContainer.appendChild(allBtn);

        // 分类按钮
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat;
            btn.onclick = () => window.galleryManager.filterByCategory(cat);
            filterContainer.appendChild(btn);
        });

        document.querySelector('.gallery').parentNode.insertBefore(
            filterContainer, 
            document.querySelector('.gallery')
        );
    }
};


// 控制台帮助信息
console.log(`
🎯 Gallery Manager 已加载！

快速使用方法：
1. 添加单个项目：
   addGalleryItem("标题", "图片路径", "链接地址", "分类")

2. 添加多个项目：
   addMultipleItems([
     {title: "标题1", image: "图片1", link: "链接1"},
     {title: "标题2", image: "图片2", link: "链接2"}
   ])
3. 开启点击删除模式，然后用鼠标点击删除
enableDeleteMode(true);

// 或者用命令删除
removeByTitle("GitHub");        // 删除GitHub
removeByCategory("ai");         // 删除所有AI工具
removeLast();                   // 删除最后一个
4. 清空所有项目：
   clearGallery()

5. 高级功能：
   galleryManager.filterByCategory("tool") // 筛选分类
   GalleryUtils.exportToJSON()            // 导出配置
   GalleryUtils.createCategoryFilter()    // 创建筛选器

示例：
addGalleryItem("ChatGPT", "./res/chatgpt.jpg", "https://chat.openai.com", "tool");

galleryManager.listItems();


`);