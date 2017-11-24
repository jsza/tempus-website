import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ZopfliPlugin from 'zopfli-webpack-plugin'
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


export default
  { devtool: 'source-map'
  , entry:
    { main: path.join(__dirname, '..', 'src', 'index.js')
    }
  , output:
    { path: path.join(__dirname, '..', 'build')
    , filename: 'bundle.js'
    }
  , resolve:
    { alias:
      { root: path.join(__dirname, '..', 'src')
      }
    }
  , plugins:
    [ new webpack.optimize.ModuleConcatenationPlugin()
    // , new webpack.IgnorePlugin(/\.\/dev/, /\/config$/)
    , new webpack.DefinePlugin(
      { 'process.env':
        { NODE_ENV: JSON.stringify('production')
        }
      })
    , new webpack.DefinePlugin(
      { __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
      , __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
      })
    , new webpack.optimize.UglifyJsPlugin({sourceMap: true})
    , new ExtractTextPlugin('../build/styles.css')
    , new webpack.optimize.CommonsChunkPlugin(
      { name: 'vendor'
      , filename: 'vendor.js'
      , minChunks: ({resource}) => (
          resource
          && resource.match(/\.js$/)
          && resource.indexOf('node_modules') >= 0
        )
      })
    , new ZopfliPlugin()
    // , new BundleAnalyzerPlugin()
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
      , { test: /\.styl$/
        , exclude: /node_modules/
        , use: ExtractTextPlugin.extract(
          { use: ['css-loader', 'stylus-loader']
          , fallback: 'style-loader'
          })
        }
      ]
    }
  }
