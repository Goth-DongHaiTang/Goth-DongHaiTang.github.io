# cloudflare documentation
# npm craete cloudflare
创建项目 按需回车选择

# cd 项目名


# npx wrangler dev 
本地测试
# http://localhost:8787/

主要目录:
# src/index.ts

export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};

# export default
是定义 JavaScript 模块↗所需的 JavaScript 语法。您的 Worker 必须具有对象的默认导出，其属性与 Worker 应处理的事件相对应。
----------------------------
# fetch()
当您的 Worker 收到 HTTP 请求时，将调用此 fetch（） 处理程序。您可以在导出的对象中定义其他事件处理程序以响应不同类型的事件。例如，添加一个 scheduled（） 处理程序以通过 Cron 触发器响应 Worker 调用。
此外，处理程序fetch将始终传递三个参数：request、env 和 context。
----------------------------------------
# return
Workers 运行时期望处理程序返回一个对象或一个 Promise，该对象或 Promise 与对象一起解析。在此示例中，您将返回一个带有字符串 .fetchResponseResponseResponse"Hello World!"

# 练习 ：试着更改字符串内容
    export default {
  async fetch(request, env, ctx) {
    return new Response("花落人烟淡，又逢一冬离");
  },
};
# npx wrangler deploy
应用 部署更改

# AI辅助提示词
     [提示词](./promt/turtilon-prompt.md)