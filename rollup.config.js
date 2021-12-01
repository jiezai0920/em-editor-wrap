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
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import vueJsx from 'rollup-plugin-vue-jsx-compat'

const Global = `var process = {
    env: {
      NODE_ENV: 'production'
    }
  }`;
  

export default {
    // input: 'src/lib/index.ts',
    input: 'src/lib/index.js',
    external: ['vue', 'axios', '@fe6/water-pro'],
    globals: {
        vue: 'Vue',
        axios: 'Axios',
        '@fe6/water-pro': '@fe6/water-pro',
    },
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
        // plugins: [terser()]
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
        // plugins: [terser()]
    }],
    plugins: [
        json(),
        // resolve({ preferBuiltins: false, mainFields: ['browser'] }),
        // ts({
        //   check: process.env.NODE_ENV === 'production',
        //   tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        //   cacheRoot: path.resolve(__dirname, 'node_modules/.cache_ts'),
        //   tsconfigOverride: {
        //     compilerOptions: {
        //       sourceMap: false,
        //       declaration: true,
        //       declarationMap: true
        //     },
        //     exclude: ['**/__tests__', 'test-dts']
        //   }
        // }),

        // vueJsx(),
        // esbuild({
        //   jsxFactory: "vueJsxCompat",
        // }),

        // esbuild({
        //   include: /\.tsx?$/, // default, inferred from `loaders` option
        //   // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
        //   exclude: /node_modules/, // default
        //   sourceMap: false, // default
        //   minify: process.env.NODE_ENV === 'production',
        //   target: 'esnext', // default, or 'es20XX', 'esnext'
        //   jsx: 'transform', // default, or 'preserve'
        //   jsxFactory: 'vueJsxCompat',
        //   experimentalBundling:true,
        //   // Like @rollup/plugin-replace
        //   define: {
        //     __VERSION__: '"x.y.z"',
        //   },
        //   tsconfig: path.resolve(__dirname, 'tsconfig.json'), // default
        //   // Add extra loaders
        //   loaders: {
        //     // Add .json files support
        //     // require @rollup/plugin-commonjs
        //     // '.json': 'json',
        //     // Enable JSX in .js files too
        //     '.js': 'jsx',
        //   },
        // }),
        vue({
            include: /\.vue$/,
            // target: 'browser',
            compileTemplate: true,
        }),
        nodeResolve(),
        commonjs(),
        scss({ include: /\.scss$/, sass: dartSass }),
        // babel({
        //   exclude: 'node_modules/**',
        //   extensions: ['.js', '.jsx', '.vue'],
        //   babelHelpers: 'bundled'
        // }),
    ],
}
