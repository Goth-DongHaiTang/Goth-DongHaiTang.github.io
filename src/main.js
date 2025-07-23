        // 抽屉控制
         function toggleLeftSidebar() {
            const sidebar = document.getElementById('leftSidebar');
            const overlay = document.getElementById('overlay');
            
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }

         function toggleRightSidebar() {
            const sidebar = document.getElementById('rightSidebar');
            const overlay = document.getElementById('overlay');
            
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        // 搜索功能
        function toggleSearch() {
            const searchContainer = document.getElementById('searchContainer');
            const searchInput = document.getElementById('searchInput');
            
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
                // 自动聚焦到搜索框
            } else {
                searchInput.value = ''; // 清空搜索内容
                clearSearch();  //清空搜索内容
            }
        }

         function searchContent() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const resources = document.querySelectorAll('.boxResource');
            
            clearSearch();
            
            if (query.trim() === '') return;
            
            resources.forEach(resource => {
                const keywords = resource.getAttribute('data-keywords').toLowerCase();
                const brief = resource.querySelector('.brief').textContent.toLowerCase();
                
                if (keywords.includes(query) || brief.includes(query)) {
                    resource.classList.add('highlight');
                    resource.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }

        function clearSearch() {
            document.querySelectorAll('.boxResource').forEach(resource => {
                resource.classList.remove('highlight');
            });
        }

        // 主题切换
        function setTheme(theme) {
            const body = document.body;
            const themeButtons = document.querySelectorAll('.theme-btn');
            
            // 清除所有主题类
            body.classList.remove('dark-theme', 'light-theme', 'warm-theme');
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // 应用新主题
            if (theme !== 'default') {
                body.classList.add(`${theme}-theme`);
            }
            
            // 激活对应按钮
            document.querySelector(`.theme-btn.${theme}`).classList.add('active');
            
            // 保存主题设置
            localStorage.setItem('theme', theme);
        }

        // 点击遮罩层关闭抽屉
        document.getElementById('overlay').addEventListener('click', function() {
            document.getElementById('leftSidebar').classList.remove('active');
            document.getElementById('rightSidebar').classList.remove('active');
            this.classList.remove('active');
        });

        // 键盘快捷键
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                toggleSearch();
            }
            if (e.key === 'Escape') {
                document.getElementById('leftSidebar').classList.remove('active');
                document.getElementById('rightSidebar').classList.remove('active');
                document.getElementById('overlay').classList.remove('active');
                document.getElementById('searchContainer').classList.remove('active');
                clearSearch();
            }
        });

        // 页面加载时恢复主题设置
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme') || 'default';
            setTheme(savedTheme);
        });