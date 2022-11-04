import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// rollup.config.js
// 以下注释是为了能使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ['src/index.js'],
  external: [],
  plugins: [resolve(), commonjs()],
  output: [
    {
      // 产物输出目录
      dir: 'dist/es',
      entryFileNames: `[name].[hash].js`,
      chunkFileNames: `chunk-[hash].js`,
      assetFileNames: `assets/[name]-[hash][extname]`,
      sourcemap: true,
      // 如果是打包出 iife/umd 格式，需要对外暴露出一个全局变量，通过 name 配置变量名
      name: 'MyBundle',
      globals: {
        // 项目中可以直接用`$`代替`jquery`
        jquery: '$'
      },
      // 产物格式
      format: 'esm'
    },
    {
      dir: 'dist/cjs',
      format: 'cjs'
    }
  ]
};

export default buildOptions;
// 多配置
// export default [buildOptions, buildOptions2];
