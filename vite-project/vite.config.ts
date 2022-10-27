import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import path from 'path';
// 解决scss全局变量单独引入的问题
import { normalizePath } from 'vite';
// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));
// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置 -> ${root}/index.html
  // root: path.join(__dirname, 'src'),
  plugins: [react()],
  // 解决scss全局变量单独引入的问题
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
