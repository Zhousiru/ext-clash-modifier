const remove = ['proxy-groups', 'rules', 'rule-providers']
const append = `
proxy-groups:
  - name: 🔯 代理模式
    type: select
    proxies:
      - 绕过大陆丨黑名单(GFWlist)
      - 绕过大陆丨白名单(Whitelist)
  - name: 🔰 选择节点
    type: select
    proxies: [DIRECT, _PROXY_NAME]
  - name: 🛑 广告拦截
    type: select
    proxies:
      - DIRECT
      - REJECT
      - PROXY
  - name: 绕过大陆丨黑名单(GFWlist)
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 86400
    proxies:
      - DIRECT
  - name: 绕过大陆丨白名单(Whitelist)
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 86400
    proxies:
      - PROXY
  - name: PROXY
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 86400
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

`

export default { remove, append }
