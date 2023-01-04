const path = require('path');

module.exports = {
  title: 'Style Guide',
  pagePerSection: true,
  sections: [
    {
      name: 'Base Elements',
      content: path.join(__dirname, 'scripts/vue/README.md'),
    },
  ],
  exampleMode: 'expand',
  require: [path.join(__dirname, 'assets/layout.css')],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
};
