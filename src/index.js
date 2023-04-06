import { Base64 } from "js-base64";
import yaml from "js-yaml";
import "./template.js";
import template from "./template.js";

export default {
  async fetch(request) {
    let { pathname } = new URL(request.url);

    if (pathname.startsWith("/p/")) {
      let filename = pathname.slice(3)
      return fetch(`https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/${filename}`)
    }

    if (!pathname.startsWith("/m/")) {
      return new Response(`error: invalid parameter`, {
        headers: {
          "content-type": "text/plain",
        },
      });
    }

    let configUrl = Base64.decode(pathname.slice(3));

    let resp = await fetch(configUrl);
    let rawConfig = await resp.text();
    let configObj = yaml.load(rawConfig);

    // remove
    template.remove.forEach((key) => {
      if (key in configObj) {
        delete configObj[key];
      }
    });

    // append
    let appendObj = yaml.load(template.append);
    configObj = Object.assign(configObj, appendObj);

     // regroup
    let proxyNames = {
      HK: ["REJECT"],
      TW: ["REJECT"],
      SG: ["REJECT"],
      JP: ["REJECT"],
      US: ["REJECT"],
      NF: ["REJECT"],
      CG: ["REJECT"],
      OTHERS: ["REJECT"],
      ALL: ["REJECT"],
      };
    configObj["proxies"].forEach((proxyElem) => {
      let k = 0;
      let name = proxyElem["name"]
      if (name.match(/HK|hk|\u6e2f/)){
        proxyNames.HK.push(name); k++;}
      if (name.match(/TW|tw|\u53f0/)){
        proxyNames.TW.push(name); k++;}
      if (name.match(/SG|sg|\u72ee\u57ce|\u65b0\u52a0\u5761/)) {
        proxyNames.SG.push(name); k++;}
      if (name.match(/JP|jp|\u65e5\u672c/)){
        proxyNames.JP.push(name); k++;}
      if (name.match(/US|us|\u7f8e\u56fd/)){
        proxyNames.US.push(name); k++;}
      if (name.match(/Netflix|NF|\u89e3\u9501|\u7f51\u98de/)){
        proxyNames.NF.push(name); k++;}
      if (name.match(/gpt|GPT|Gpt|chat|Chat|CHAT/)){
        proxyNames.CG.push(name); k++;}
      if (k === 0){proxyNames.OTHERS.push(name);}
      proxyNames.ALL.push(proxyElem["name"]);
    });
     // replace names
    configObj["proxy-groups"].forEach((groupElem) => {
      let proxiesArr = groupElem["proxies"];
      let mapObj = {
         "_PROXY_NAME_ALL": proxyNames.ALL,
          "_PROXY_NAME_SG": proxyNames.SG,
          "_PROXY_NAME_HK": proxyNames.HK,
          "_PROXY_NAME_TW": proxyNames.TW,
          "_PROXY_NAME_US": proxyNames.US,
          "_PROXY_NAME_JP": proxyNames.JP,
          "_PROXY_NAME_NF": proxyNames.NF,
          "_PROXY_NAME_CG": proxyNames.CG,
          "_PROXY_NAME_OT": proxyNames.OTHERS,
      }
      for (let key in mapObj) {
        let i = proxiesArr.indexOf(key);
        if (i !== -1) {
          proxiesArr.splice(i-1, 1, ...mapObj[key]);
        }
      }
    });

    // replace rule provider proxy
    Object.keys(configObj["rule-providers"]).forEach(index => {
      let providerElem = configObj["rule-providers"][index];
      let providerProxy = new URL(request.url).origin + '/p/'
      providerElem['url'] = providerElem['url'].replace('_PROVIDER_PROXY|', providerProxy)
    });


    let configStr = yaml.dump(configObj);
    return new Response(configStr, {
      headers: resp.headers,
    });
  },
};
