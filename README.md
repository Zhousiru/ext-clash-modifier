# External Clash Modifier

[Related Post](https://pooi.me/external-clash-modifier/)

一个简陋的外置 Clash 配置文件修改器，用于在不支持 Parser 的 GUI （如 Clash For Android）上实现机场自带策略的覆写，同时附带 Rule Provider 反向代理服务。

支持显示已使用流量、总流量、到期时间。

运行于 Cloudflare Workers。

策略来源于 [这个 Issue](https://github.com/Fndroid/clash_for_windows_pkg/issues/2193)

## 部署

1. 安装 [wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler)

```
npm i -g wrangler
```

2. Clone 这个项目，然后在 Repo 中执行

```
wrangler login
wrangler publish
```

3. 绑定你的域名 (。・∀・)ノ

## 自定义 `template.js`

默认的应该足够用了，如果需要进一步自定义，可以修改 `template.js` 和 `index.js`（逃

## 使用

```
https://<your-domain>/m/<base64-config-url>
```

## 注意事项

`workers.dev` 已被墙，请使用自有域名。
