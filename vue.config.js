const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
       plugins: [
          new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
          })
        ]
    }
}
