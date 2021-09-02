import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser";
import ts from 'rollup-plugin-typescript2';

const Global = `var process = {
    env: {
      NODE_ENV: 'production'
    }
  }`;
  

export default {
    input: 'src/lib/index.ts',
    output: [{
        globals: {
            vue: 'Vue',
            axios: 'Axios',
            '@fe6/water-pro': '@fe6/water-pro',
        },
        exports: 'named',
        name: 'em-ueditor-wrap',
        file: 'dist/em-ueditor-wrap.js',
        format: 'umd',
        banner: Global,
        plugins: [terser()]
    }, {
        globals: {
            vue: 'Vue',
            axios: 'Axios',
            '@fe6/water-pro': '@fe6/water-pro',
        },
        exports: 'named',
        file: 'dist/em-ueditor-wrap.esm.js',
        format: 'es',
        banner: Global,
        plugins: [terser()]
    }],
    plugins: [
        json(),
        resolve({ preferBuiltins: false, mainFields: ['browser'] }),
        vue({
            include: /\.vue$/,
        }),
        ts({
          check: process.env.NODE_ENV === 'production',
          tsconfig: path.resolve(__dirname, 'tsconfig.json'),
          cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
          tsconfigOverride: {
            compilerOptions: {
              sourceMap: false,
              declaration: true,
              declarationMap: true
            },
            exclude: ['**/__tests__', 'test-dts']
          }
        }),
        commonjs(),
        scss({ include: /\.scss$/, sass: dartSass }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.vue'],
            babelHelpers: 'bundled'
        }),
    ],
    external: ["vue", "@fe6/water-pro"],
}
