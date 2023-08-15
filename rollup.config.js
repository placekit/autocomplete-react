import path from 'node:path';

import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

import pkg from './package.json' assert { type: 'json' };
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
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
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
