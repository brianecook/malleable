const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function getScriptFiles() {
  const entries = {};
  const files = [
    ...glob.sync('./scripts/*.ts'),
    ...glob.sync('./scripts/sections/*.ts'),
    ...glob.sync('./scripts/preact/apps/**/app.tsx')
  ];
  files.forEach((file) => {
    let fileName;
    if (file.includes('/apps/'))  {
      fileName = `app-${file.split('/apps/')[1].split('/')[0]}`;
    } else {
      fileName = file
        .substring(file.lastIndexOf('/') + 1)
        .replace('.ts', '');
    }
    entries[fileName] = `./${file}`;
  });
  return entries;
}



const scriptsConfig = {
  mode: 'development',
  entry: getScriptFiles(),
  resolve: {
    alias: {
      '@scripts': path.resolve(__dirname, 'scripts'),
      '@styles': path.resolve(__dirname, 'styles'),
    },
    extensions: ['.ts', '.tsx', '.js'],
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
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
        loader: 'babel-loader',
        exclude: /node_modules/,
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

module.exports = [scriptsConfig];
