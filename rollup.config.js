const path = require('path');

const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const copy = require('rollup-plugin-copy');

const pkg = require('./package.json');
const banner = [
  `/*! ${pkg.name} v${pkg.version}`,
  '© placekit.io',
  `${pkg.license} license`,
  `${pkg.homepage} */`,
].join(' | ');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      banner,
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
      banner,
    },
  ],
  external: [/node_modules/],
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      extensions: ['.js', '.jsx'],
    }),
    babel({
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
      presets: ['@babel/preset-react'],
    }),
    commonjs(),
    copy({
      targets: [
        {
          src: 'src/index.d.ts',
          dest: path.dirname(pkg.types),
          rename: path.basename(pkg.types),
          transform: (content) => [banner, content].join("\n"),
        },
      ]
    })
  ],
};
