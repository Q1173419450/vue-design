module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 数据拦截
        bypass: function (req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request');
            return '/index.html'
          } else if (process.env.MOCK !== "none") {
            console.log(req.path);
            // console.log(req.path.split('/api/')[1].split('/'));
            // console.log(req.path.split('/api/')[1].split('/').join('_'));

            const name = req.path.split('/api/')[1].split('/').join('_');
            console.log(name);
            // require 进来是缓存数据
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 清除缓存
            delete require.cache[require.resolve(`./mock/${name}`)]
            return res.send(result)
          }
        }
      }
    }
  }
}