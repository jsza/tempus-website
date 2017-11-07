var path = require('path')
var webpack = require('webpack')

module.exports =
{ devtool: 'source-map'
, entry:
  { 'main': './js/index'
  }
, output:
  { path: path.join(__dirname, '..', '..', '..', 'build', 'website')
  , filename: 'bundle.js'
  }
, plugins:
  [ new webpack.IgnorePlugin(/\.\/dev/, /\/config$/)
  , new webpack.DefinePlugin(
    { 'process.env':
      { NODE_ENV: JSON.stringify('production')
      }
    })
  , new webpack.DefinePlugin(
    { __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    , __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })
  , new webpack.optimize.ModuleConcatenationPlugin()
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
      , use: ['json-loader?paths=/src/js/']
      }
    , { test: /\.styl$/
      , use: ['style-loader', 'css-loader', 'stylus-loader']
      , exclude: /node_modules/
      }
    ]
  }
}
