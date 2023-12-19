export function buildFileLoader() {
  return {
    test: /\.(png|jpe?g|gif|woff2|woff|svg)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  };
}
