const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getScriptFiles() {
  const entries = {};
  glob.sync('./src/scripts/*.js').forEach((file) => {
    const fileName = file
      .substring(file.lastIndexOf('/') + 1)
      .replace('.js', '');
    entries[fileName] = file;
  });
  return entries;
}

function getWidgetFiles() {
  const entries = {};
  glob.sync('./src/scripts/vue/**/app.js').forEach((file) => {
    const fileParts = file.split('/');
    const name = `widget-${fileParts[fileParts.length - 2]}`;
    entries[name] = file;
  });
  return entries;
}

const widgetsConfig = {
  entry: getWidgetFiles(),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'shopify/assets'),
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
};

const scriptsConfig = {
  entry: getScriptFiles(),
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'src/scripts'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'shopify/assets'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, './src/styles/resources.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = [scriptsConfig, widgetsConfig];
