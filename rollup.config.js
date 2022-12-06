import path from 'path';

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';
const banner = [
  `/*! ${pkg.name} v${pkg.version}`,
  '© placekit.io',
  `${pkg.license} license`,
  `${pkg.homepage} */`,
].join(' | ');

export default {
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
