const path = require('path');
const glob = require('glob');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getScriptFiles() {
  const entries = {};
  const files = [
    ...glob.sync('./scripts/*.js'),
    ...glob.sync('./scripts/sections/*.js'),
  ];
  files.forEach((file) => {
    const fileName = file
      .substring(file.lastIndexOf('/') + 1)
      .replace('.js', '');
    entries[fileName] = `./${file}`;
  });
  return entries;
}

function getAppFiles() {
  const entries = {};
  glob
    .sync(['./scripts/vue/apps/**/app.js', './scripts/preact/apps/**/app.jsx'])
    .forEach((file) => {
      const fileParts = file.split('/');
      const name = `${fileParts[fileParts.length - 2]}.${fileParts[1]}`;
      entries[name] = `./${file}`;
    });
  return entries;
}

const appsConfig = {
  mode: 'development',
  entry: getAppFiles(),
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'scripts'),
      '@components': path.resolve(__dirname, 'scripts/vue/components'),
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
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
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            ['@babel/transform-runtime'],
            [
              '@babel/plugin-transform-react-jsx',
              { pragma: 'h', pragmaFrag: 'Fragment' },
            ],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const scriptsConfig = {
  mode: 'development',
  entry: getScriptFiles(),
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'scripts'),
      '@styles': path.resolve(__dirname, 'styles'),
    },
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'assets'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
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
              resources: [path.resolve(__dirname, './styles/resources.scss')],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = [scriptsConfig, appsConfig];
