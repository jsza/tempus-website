var path = require('path')
var webpack = require('webpack')

module.exports =
{ devtool: '#cheap-module-eval-source-map'
, entry:
  [ 'webpack-dev-server/client?http://localhost:3001'
  // , 'webpack/hot/only-dev-server'
  , 'react-hot-loader/patch'
  , path.join(__dirname, '..', 'index.js')
  ]
, output:
  { path: path.join(__dirname, 'dist')
  , filename: 'bundle.js'
  , publicPath: 'http://localhost:3001/static/js/'
  }
, plugins:
  [ new webpack.NamedModulesPlugin()
  , new webpack.HotModuleReplacementPlugin()
  , new webpack.DefinePlugin(
    { __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    , __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })
  ]
, module:
  { rules:
    [ { test: /\.js$/
      , exclude: /node_modules/
      , include: path.join(__dirname, '..')
      , use:
        [ { loader: 'babel-loader'
          , options:
            { presets: ['env', 'react']
            }
          }]
      }
    , { test: /\.json$/
      , loader: 'json-loader?paths=/js/'
      }
    , { test: /\.styl$/
      , exclude: /node_modules/
      , use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    // , { test: /\.css$/
    //   , exclude: /node_modules/
    //   , use: ['css-loader']
    //   }
    ]
  , noParse: [/\.md$/]
  }
, devServer:
  { headers: { 'Access-Control-Allow-Origin': '*' }
  , inline: true
  }
, node:
  { fs: 'empty'
  , tls: 'empty'
  }
}
