// 指定需要在原有配置文件上删除的字段
const remove = ["proxy-groups", "rules", "rule-providers"];

// 指定需要需要追加的 YAML 配置，注意缩进
// 在数组中，使用 `_PROXY_NAME` 指代所有的 Proxy Name
// 在 Rule Provider 中的 URL 中，使用 `_PROVIDER_PROXY|` 指代规则文件代理 URL
const append = `
proxy-groups:
  - name: 🔯 代理模式
    type: select
    proxies:
      - 绕过大陆丨黑名单(GFWlist)
      - 绕过大陆丨白名单(Whitelist)
  - name: 🔰 选择节点
    type: select
    proxies: [AUTO丨SG 新加坡, DIRECT, AUTO丨TW 台湾, AUTO丨HK 香港, AUTO丨JP 日本, AUTO丨US 美国, AUTO丨NF 网飞, AUTO丨Chatgpt, MANUAL丨ALL 手动, MANUAL丨Others 其他]
  - name: MANUAL丨ALL 手动
    type: select
    proxies: [_PROXY_NAME_ALL]
  - name: MANUAL丨Others 其他
    type: select
    proxies: [_PROXY_NAME_OT]
  - name: AUTO丨SG 新加坡
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_SG]
  - name: AUTO丨HK 香港
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_HK]
  - name: AUTO丨JP 日本
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_JP]
  - name: AUTO丨US 美国
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_US]
  - name: AUTO丨NF 网飞
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_NF]
  - name: AUTO丨Chatgpt
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_CG]
  - name: AUTO丨TW 台湾
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 28800
    proxies: [_PROXY_NAME_TW]
  - name: 🛑 广告拦截
    type: select
    proxies:
      - REJECT
      - DIRECT
      - PROXY
  - name: 绕过大陆丨黑名单(GFWlist)
    type: select
    proxies:
      - DIRECT
  - name: 绕过大陆丨白名单(Whitelist)
    type: select
    proxies:
      - PROXY
  - name: PROXY
    type: select
    proxies:
      - 🔰 选择节点

rules:
  - RULE-SET,applications,DIRECT
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  - RULE-SET,private,DIRECT
  - RULE-SET,reject,🛑 广告拦截
  - RULE-SET,icloud,DIRECT
  - RULE-SET,apple,DIRECT
  - RULE-SET,google,DIRECT
  - RULE-SET,tld-not-cn,PROXY
  - RULE-SET,gfw,PROXY
  - RULE-SET,greatfire,PROXY
  - RULE-SET,telegramcidr,PROXY
  - RULE-SET,lancidr,DIRECT
  - RULE-SET,cncidr,DIRECT
  - GEOIP,,DIRECT
  - GEOIP,CN,DIRECT
  - RULE-SET,direct,DIRECT
  - RULE-SET,proxy,🔯 代理模式
  - MATCH,🔯 代理模式

rule-providers:
  reject:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|reject.txt
    path: ./ruleset/reject.yaml
    interval: 86400
  icloud:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|icloud.txt
    path: ./ruleset/icloud.yaml
    interval: 86400
  apple:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|apple.txt
    path: ./ruleset/apple.yaml
    interval: 86400
  google:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|google.txt
    path: ./ruleset/google.yaml
    interval: 86400
  proxy:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|proxy.txt
    path: ./ruleset/proxy.yaml
    interval: 86400
  direct:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|direct.txt
    path: ./ruleset/direct.yaml
    interval: 86400
  private:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|private.txt
    path: ./ruleset/private.yaml
    interval: 86400
  gfw:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|gfw.txt
    path: ./ruleset/gfw.yaml
    interval: 86400
  greatfire:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|greatfire.txt
    path: ./ruleset/greatfire.yaml
    interval: 86400
  tld-not-cn:
    type: http
    behavior: domain
    url: _PROVIDER_PROXY|tld-not-cn.txt
    path: ./ruleset/tld-not-cn.yaml
    interval: 86400
  telegramcidr:
    type: http
    behavior: ipcidr
    url: _PROVIDER_PROXY|telegramcidr.txt
    path: ./ruleset/telegramcidr.yaml
    interval: 86400
  cncidr:
    type: http
    behavior: ipcidr
    url: _PROVIDER_PROXY|cncidr.txt
    path: ./ruleset/cncidr.yaml
    interval: 86400
  lancidr:
    type: http
    behavior: ipcidr
    url: _PROVIDER_PROXY|lancidr.txt
    path: ./ruleset/lancidr.yaml
    interval: 86400
  applications:
    type: http
    behavior: classical
    url: _PROVIDER_PROXY|applications.txt
    path: ./ruleset/applications.yaml
    interval: 86400

`;

export default { remove, append };
