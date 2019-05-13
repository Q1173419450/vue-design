module.exports = {
  css: {
    loaderOptions: {
      less: {
        // main.js 需要引入 less 样式
        // modifyVars: {
        //   "primary-color": "#1DA57A"
        // },
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // 数据拦截
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            console.log(req.path);
            // console.log(req.path.split('/api/')[1].split('/'));
            // console.log(req.path.split('/api/')[1].split('/').join('_'));

            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            console.log(name);
            // require 进来是缓存数据
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 清除缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
