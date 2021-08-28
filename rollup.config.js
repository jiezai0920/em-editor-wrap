import resolve from 'rollup-plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser";

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
            VueUeditorWrap: 'vue-ueditor-wrap',
        },
        name: 'em-ueditor-wrap',
        file: 'dist/em-ueditor-wrap.js',
        format: 'umd',
        banner: Global,
        plugins: [terser()]
    }, {
        globals: {
            vue: 'Vue',
            VueUeditorWrap: 'vue-ueditor-wrap',
        },
        name: 'em-ueditor-wrap',
        file: 'dist/em-ueditor-wrap.esm.js',
        format: 'es',
        banner: Global,
        plugins: [terser()]
    }],
    plugins: [
        json(),
        resolve(),
        commonjs(),
        scss({ include: /\.scss$/, sass: dartSass }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.vue'],
            babelHelpers: 'bundled'
        }),
        vue({
            include: /\.vue$/,
        }),
    ],
    external: ["vue", "@fe6/water-pro"],
}