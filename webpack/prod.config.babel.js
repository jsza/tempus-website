import path from 'path'
import webpack from 'webpack'
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ZopfliPlugin from 'zopfli-webpack-plugin'
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


export default
  { mode: 'production'
  , devtool: 'source-map'
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
    // , new webpack.optimize.CommonsChunkPlugin(
    //   { name: 'vendor'
    //   , minChunks: ({resource}) => (
    //       resource
    //       && resource.match(/\.js$/)
    //       && resource.indexOf('node_modules') >= 0
    //     )
    //   })
    , new MiniCssExtractPlugin('styles.css')
    , new ZopfliPlugin(
      { deleteOriginalAssets: true
      })
    // , new BundleAnalyzerPlugin()
    ]
  , optimization:
    { splitChunks:
      { cacheGroups:
        { vendor:
          { name: 'vendor'
          , test: /node_modules/
          , chunks: 'initial'
          , priority: 10
          , enforce: true
          }
        }
      }
    , minimize: true
    }
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
              { presets:
                [ '@babel/preset-env'
                , '@babel/preset-react'
                ]
              }
            }]
        }
      , { test: /\.styl$/
        , exclude: /node_modules/
        , use:
          [ { loader: MiniCssExtractPlugin.loader
            , options:
              { sourceMap: true
              }
          }
          , { loader: 'css-loader'
            , options:
              { sourceMap: true
              }
            }
          , { loader: 'stylus-loader'
            , options:
              { sourceMap: true
              }
            }
          ]
        }
      ]
    }
  }
