export interface Env {
  COUNTER_STORE: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // 访问计数器路由
    if (url.pathname === '/count') {
      try {
        // 获取当前计数
        let counter = await env.COUNTER_STORE.get('counter');
        let count = 0;
        
        if (counter) {
          count = parseInt(await counter.text());
        }
        
        // 增加计数
        count++;
        
        // 保存新计数
        await env.COUNTER_STORE.put('counter', count.toString());
        
        // 返回JSON响应
        return new Response(JSON.stringify({
          totalVisitors: count,
          message: `您是第 ${count} 位访问者`,
          timestamp: new Date().toISOString()
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          error: '计数器访问失败',
          details: error.message
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // 默认路由 - 返回简单的计数器页面
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>访问计数器</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    body { min-height: 100vh; background: linear-gradient(135deg, #1a2a6c, #b21f1f); display: flex; justify-content: center; align-items: center; padding: 20px; color: white; }
    .container { max-width: 600px; text-align: center; }
    .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 40px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
    h1 { margin-bottom: 30px; font-size: 2.5rem; }
    .counter { font-size: 5rem; font-weight: 800; margin: 30px 0; text-shadow: 0 0 20px rgba(255,255,255,0.5); }
    .counter-text { font-size: 1.5rem; margin-bottom: 20px; }
    .info { background: rgba(0,0,0,0.2); border-radius: 15px; padding: 20px; margin-top: 20px; }
    .info-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .info-item:last-child { border-bottom: none; }
    .btn { background: linear-gradient(45deg, #6a11cb, #2575fc); color: white; border: none; padding: 12px 25px; border-radius: 50px; font-size: 1.1rem; cursor: pointer; margin-top: 20px; transition: all 0.3s; }
    .btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
    .animate { animation: pulse 0.5s; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>访问计数器</h1>
      <div class="counter-text">您是本站点的第</div>
      <div id="counter" class="counter">0</div>
      <div class="counter-text">位访问者</div>
      
      <div class="info">
        <div class="info-item">
          <span>访问时间：</span>
          <span id="time"></span>
        </div>
        <div class="info-item">
          <span>Worker URL：</span>
          <span id="workerUrl"></span>
        </div>
      </div>
      
      <button class="btn" onclick="updateCounter()">刷新计数</button>
    </div>
  </div>
  
  <script>
    // 获取Worker URL
    document.getElementById('workerUrl').textContent = window.location.origin;
    
    // 更新时间和计数器
    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      document.getElementById('time').textContent = timeStr;
    }
    
    // 获取计数器数据
    async function updateCounter() {
      try {
        const counterEl = document.getElementById('counter');
        counterEl.classList.add('animate');
        
        const response = await fetch('/count');
        const data = await response.json();
        
        counterEl.textContent = data.totalVisitors;
        document.getElementById('time').textContent = new Date().toLocaleTimeString();
        
        setTimeout(() => {
          counterEl.classList.remove('animate');
        }, 500);
      } catch (error) {
        console.error('获取计数失败:', error);
        alert('获取计数失败，请重试');
      }
    }
    
    // 初始加载
    updateCounter();
    updateTime();
    setInterval(updateTime, 1000);
  </script>
</body>
</html>`;
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}