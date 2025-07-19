# Goth-DongHaiTang.github.io
my page
# cloudflare-worker  标准入口格式
export default {
  async fetch(request) {
    // 请求处理逻辑


fetch 方法是 Worker 的请求处理函数

async 表明这是一个异步函数

try{

const url = new URL(request.url);
声明一个变量 url 并赋值一个对象URL给它


if (url.pathname === "/") {
  return new Response("Hello from Cloudflare Worker!", {
    headers: { "Content-Type": "text/plain" }
  });
}

如果 (网页.路径名称=== "/" 无){
    返回 新的 对象响应(“Hello from Cloudflare Worker!”，{
        头部: { "内容类型": "文本/纯文本" }
    })
}


if (url.pathname === "/test")  如果网页.路径是=== "/test"
{           -----------------------------------------------
  const data = {                  // 创建一个对象 data 
    method: request.method,       // 请求方法 (GET/POST等)
    path: url.pathname,           // 请求路径
    query: Object.fromEntries(url.searchParams), // 查询参数转对象
    headers: Object.fromEntries(request.headers), // 请求头转对象
    cf: request.cf                // Cloudflare 特殊数据
  };
  ---------------------------------------------------------
  return new Response(JSON.stringify(data, null, 2), {     返回新的结果(生成格式化的 JSON（2空格缩进）)
                                                            设置 JSON 内容类型头
    headers: { "Content-Type": "application/json" }
  });

}

return new Response("Not Found", { status: 404 });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map