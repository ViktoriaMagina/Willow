const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'none',
    entry: {
        index: './src/scripts/index.js',  //При необходимости вы можете добавить новую точку входа
    },
    output: {
      filename: '[name].js',
      clean: true,
    },
    optimization: config = {
      splitChunks: {
          chunks: 'all',
      },
      minimize: true,
      minimizer: [new TerserPlugin()],
      },
    module: {
      rules: [
        {
            test: /\.js/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
      ],
    },
  };