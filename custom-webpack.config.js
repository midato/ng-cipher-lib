const webpack = require('webpack');

module.exports = {
  target: 'node', resolve: {
    extensions: ['.ts', '.js'], fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      fa: false
    }
  }, plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }), new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
};
