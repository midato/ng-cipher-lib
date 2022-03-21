const webpack = require('webpack');

module.exports = {
  target: 'node', webpack: {
    configure: (webpackConfig, {env, paths}) => {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.resolve.fallback = {
        fs: false
      };
      return webpackConfig;
    }
  }, resolve: {
    extensions: ['.ts', '.js'], fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve("crypto-browserify"),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib')
      // asn1: require.resolve('parse-asn1'),
      // rsa: require.resolve('browserify-rsa')
    }
  }, plugins: [// Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }), new webpack.ProvidePlugin({
      process: 'process/browser'
    })]
};
