import path from 'path'
import webpack from 'webpack'


export default
  { resolve:
    { alias:
      { root: path.join(__dirname, '..')
      }
    }
  // , plugins:
  //   [ new webpack.DefinePlugin(
  //     { __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
  //     , __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
  //     })
  //   ]
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
  , node:
    { fs: 'empty'
    , tls: 'empty'
    }
  }
