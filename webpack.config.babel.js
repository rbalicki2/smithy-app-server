import path from 'path';

const target = process.env.TARGET;

const pathToTarget = path.join(__dirname, target);
const baseName = path.basename(pathToTarget);
module.exports = {
  entry: "./static/index.js",
  resolve: {
    alias: {
      target: path.join(pathToTarget, 'dist', baseName),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: process.env.NODE_ENV,
};
