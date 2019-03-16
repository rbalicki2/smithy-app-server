import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.babel';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const options = {
  contentBase: [
    path.join(__dirname, '../static'),
  ],
  host: 'localhost',
  compress: isProd,
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(8080, 'localhost');
