var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(3001, null, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3001');
});
