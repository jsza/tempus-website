import path from 'path'
import webpack from 'webpack'


export default
  { devtool: 'cheap-module-eval-source-map'
  , entry:
    [ 'react-hot-loader/patch'
    , 'webpack-dev-server/client?http://localhost:3001'
    , 'webpack/hot/only-dev-server'
    , path.join(__dirname, '..', 'src', 'index.js')
    ]
  , output:
    { path: path.join(__dirname, 'dist')
    , filename: 'bundle.js'
    , publicPath: 'http://localhost:3001/'
    }
  , resolve:
    { alias:
      { root: path.join(__dirname, '..', 'src')
      }
    }
  , plugins:
    [ new webpack.HotModuleReplacementPlugin()
    , new webpack.NamedModulesPlugin()
    , new webpack.NoEmitOnErrorsPlugin()
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
            }
          ]
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
    { host: 'localhost'
    , port: 3001
    , headers: { 'Access-Control-Allow-Origin': '*' }
    , hot: true
    // , inline: true
    , historyApiFallback: true
    , proxy:
      { '/api':
        // { target: 'https://tempus.xyz/'
        { target: 'http://localhost:8080'
        , secure: true
        , changeOrigin: true
        , logLevel: 'debug'
        }
      }
    }
  , node:
    { fs: 'empty'
    , tls: 'empty'
    }
  }
