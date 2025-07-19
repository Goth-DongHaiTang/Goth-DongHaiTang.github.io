// 最小化 Cloudflare Worker 测试单元
export default {
  async fetch(request) {
    try {
      // 解析请求 URL
      const url = new URL(request.url);
      
      // 首页路由 - 返回简单响应
      if (url.pathname === '/') {
        return new Response('Hello from Cloudflare Worker!', {
          headers: { 'Content-Type': 'text/plain' }
        });
      }
      
      // 测试路由 - 返回请求信息
      if (url.pathname === '/test') {
        const data = {
          method: request.method,
          path: url.pathname,
          query: Object.fromEntries(url.searchParams),
          headers: Object.fromEntries(request.headers),
          cf: request.cf
        };
        
        return new Response(JSON.stringify(data, null, 2), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 未匹配路由 - 返回 404
      return new Response('Not Found', { status: 404 });
      
    } catch (error) {
      // 错误处理
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
};