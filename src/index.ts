export default {
  async fetch(request, env) {
    const key = new URL(request.url).pathname.slice(1);
    await env.MY_BUCKET.put(key, request.body);
    return new Response(`Put ${key} successfully!`);
  },
};