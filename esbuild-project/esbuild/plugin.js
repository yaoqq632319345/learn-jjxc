let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => {
      // 模块路径
      console.log(args.path);
      // 父模块路径
      console.log(args.importer);
      // namespace 标识
      console.log(args.namespace);
      // 基准路径
      console.log(args.resolveDir);
      // 导入方式，如 import、require
      console.log(args.kind);
      // 额外绑定的插件数据
      console.log(args.pluginData);
      return {
        // 错误信息
        errors: [],
        // 是否需要 external
        external: false,
        // namespace 标识
        namespace: 'env-ns',
        // 模块路径
        path: args.path,
        // 额外绑定的插件数据
        pluginData: null,
        // 插件名称
        pluginName: 'xxx',
        // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
        sideEffects: false,
        // 添加一些路径后缀，如`?xxx`
        suffix: '?xxx',
        // 警告信息
        warnings: [],
        // 仅仅在 Esbuild 开启 watch 模式下生效
        // 告诉 Esbuild 需要额外监听哪些文件/目录的变化
        watchDirs: [],
        watchFiles: []
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, (args) => {
      console.log(args);
    });
  }
};

require('esbuild')
  .build({
    entryPoints: ['src/plugin.ts'],
    bundle: true,
    outfile: 'out.js',
    // 应用插件
    plugins: [envPlugin]
  })
  .catch(() => process.exit(1));
