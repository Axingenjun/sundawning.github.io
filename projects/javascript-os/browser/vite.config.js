import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const fs = require("fs");
const log = require("server/modules/log");
const minimist = require("minimist");
const argv = minimist(minimist(process.argv)["_"]);
const { proxy_port } = argv;
const plugins = [vue()];

/**
 * 代理
 */
let proxy = {};
log("代理服务器端口", proxy_port);
if (proxy_port) {
  ["/http://", "/https://", "/api"].forEach(function (item) {
    proxy[item] = {
      target: "http://localhost:" + proxy_port,
      changeOrigin: true,
    };
  });
}

/**
 * ant-design-vue
 */
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
plugins.push(
  Components({
    resolvers: [AntDesignVueResolver()],
  })
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  server: {
    proxy: proxy,
  },
  alias: {
    vue: "vue/dist/vue.esm-bundler.js", // 定义vue的别名，如果使用其他的插件，可能会用到别名
  },
});
