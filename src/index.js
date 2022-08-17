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

    // replace proxy names
    let proxyName = [];
    configObj["proxies"].forEach((proxyElem) => {
      proxyName.push(proxyElem["name"]);
    });

    configObj["proxy-groups"].forEach((_, index) => {
      let groupElem = configObj["proxy-groups"][index];

      let i = groupElem["proxies"].indexOf("_PROXY_NAME");
      if (i !== -1) {
        groupElem["proxies"].splice(index, 1, ...proxyName);
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
