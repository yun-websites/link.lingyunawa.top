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

## 配置路由

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
