import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
// import html from '@web/rollup-plugin-html';
import dev from 'rollup-plugin-dev'
// import nodeResolve from 'rollup-plugin-node-resolve';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';



const extensions = [".ts", ".tsx", ".js", ".jsx"];

// [{CommonJS用の設定, ES6モジュール用の設定}] という感じで複数エクスポートする
export default [

  {
    // いわゆるプロジェクトレベルのbarrelファイルです。ここからたどり着けないものはTree Shakingされます。
    // 生成が面倒な人は barrelsby とか使おうね。
    input: "src/index.tsx",

    // これをtrueにしない場合はすべて index.js に集約されます。
    preserveModules: true,

    // 出力指定
    output: {
      name:"widget",
      dir: "dist/",
      format: "iife",
      // namedExports:true,
      exports: "named",
      sourcemap: true,
      preserveModules: false, //Add this

    },

    // Rollupのプラグイン指定です。TypeScript → Babel → PostCSSと処理していきます。
    plugins: [
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'createFactory',
          'Component',
          'createElement',
        ],
      },
    }),
      typescript({
        rootDir: "src",
      }),
      dev({
        port: 3000 , 
        dirs: ['dist', 'static',"node_modules","./"],
        proxy: [{ from: '/rest', to: 'http://localhost:8080/rest/' }] 
      }),
    ],
  }
];
