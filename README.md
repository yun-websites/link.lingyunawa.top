# Link redirect server

一个基于 Node.js 内置 `http` 模块的可配置 URL 重定向服务。

## 启动

```bash
npm install
npm run build
npm start
```

开发模式（TypeScript 文件变更后自动重启）：

```bash
npm run dev
```

默认监听 `0.0.0.0:3000`，也可以通过环境变量修改：

```bash
PORT=8080 HOST=127.0.0.1 npm start
```

## Vercel 部署

项目已包含 [`api/[...path].ts`](./api/[...path].ts) 作为 Vercel Serverless Function，并通过 [`vercel.json`](./vercel.json) 将所有路径转发到该入口。

部署到 Vercel 后，以下地址会根据配置进行重定向：

```text
https://你的域名/bilibili/space
https://你的域名/ssf/eca/coding-2627/students
```

Vercel 部署不需要运行 `npm start`；Vercel 会自动识别 `api` 目录并执行 TypeScript 入口。


编辑 [`src/routes.js`](./src/routes.js)，将叶子节点设置为目标 URL：

```js
const Route = {
    example: {
        docs: "https://example.com/docs",
    },
};
```

访问 `http://localhost:3000/example/docs` 时，服务返回 `302` 重定向到配置的 URL。未配置的路径，以及只对应到中间对象的路径，返回 `404 Not Found`。

查询参数不会影响路由匹配，并会被浏览器带到重定向前后的请求流程中。
