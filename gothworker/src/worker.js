/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


// 
export default {
  async fetch(request) {
    // 你的代码写在这里
    // 例如，你可以返回一个简单的响应
    // 也可以处理请求的 URL、方法等
    // 下面是一个简单的示例，返回一个文本响应

    const url = request.url;
    if (url== "/"){
      
      return new Response("欢迎使用 Cloudflare Workers！");

    }
    return new Response("你的内容");
  }
}