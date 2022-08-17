# External Clash Modifier

一个简陋的外置 Clash 配置文件修改器，用于在不支持 Parser 的 GUI （如 Clash For Android）上实现机场自带策略的覆写，同时附带 Rule Provider 反向代理服务。
运行于 Cloudflare Workers。

[策略来源](https://github.com/Fndroid/clash_for_windows_pkg/issues/2193)

## 部署

使用 [cloudflare/wrangler](https://github.com/cloudflare/wrangler)

```
wrangler login
wrangler publish
```

## 使用

```
https://<your-domain>/m/<base64-config-url>
```

## 注意事项

`workers.dev` 已被墙，请使用自有域名。
