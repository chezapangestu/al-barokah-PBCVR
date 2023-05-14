module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
}
