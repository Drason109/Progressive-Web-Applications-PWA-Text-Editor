const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({//generates html file and add it to our bundle
        template: './index.html',
        
      }),

      new InjectManifest({//Injext to our service worker package
        swSrc: "./src-sw.js",
        swDest: 'src-sw.js',
      }),
      
      new WebpackPwaManifest({//creates a manifest.json file
        fingerprints: false,
        inject: true,
        name: 'Just another text editor',
        short_name: 'jate',
        description: 'Just another text editor',
        background_Color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath:'/',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96,128,192,348,512],
          destination: path.join('assets','icons'),
        }]
      })
    ],

    module: {
      rules: [//Loader for CSS and Babel
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};
