import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ZopfliPlugin from 'zopfli-webpack-plugin'
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


export default
  { devtool: 'source-map'
  , entry:
    { bundle: path.join(__dirname, '..', 'src', 'index.js')
    }
  , output:
    { path: path.join(__dirname, '..', 'build')
    , filename: '[name].js'
    }
  , resolve:
    { alias:
      { root: path.join(__dirname, '..', 'src')
      }
    }
  , plugins:
    [ new webpack.optimize.ModuleConcatenationPlugin()
    , new webpack.DefinePlugin(
      { 'process.env':
        { NODE_ENV: JSON.stringify('production')
        }
      })
    , new webpack.NamedModulesPlugin()
    , new webpack.optimize.CommonsChunkPlugin(
      { name: 'vendor'
      , minChunks: ({resource}) => (
          resource
          && resource.match(/\.js$/)
          && resource.indexOf('node_modules') >= 0
        )
      })
    , new webpack.optimize.UglifyJsPlugin({sourceMap: true})
    , new ExtractTextPlugin('styles.css')
    , new ZopfliPlugin(
      { deleteOriginalAssets: true
      })
    // , new BundleAnalyzerPlugin()
    ]
  , module:
    { rules:
      [ { test: /\.js$/
        , exclude: (modulePath) => (
            /node_modules/.test(modulePath) &&
            !/node_modules\/cbor/.test(modulePath)
          )
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
          { use:
            [ { loader: 'css-loader'
              , options: {sourceMap: true}
              }
            , { loader: 'stylus-loader'
              , options: {sourceMap: true}
              }
            ]
          , fallback: 'style-loader'
          })
        }
      ]
    }
  }
