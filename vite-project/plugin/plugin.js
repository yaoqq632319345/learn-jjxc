// myPlugin.js
export function myVitePlugin(options) {
  console.log(options);

  let __config;
  return {
    name: 'vite-plugin-xxx',
    load(id) {
      // 在钩子逻辑中可以通过闭包访问外部的 options 传参
    },
    // vite config hook
    // config 为vite.config.ts, command 为 `serve`(开发环境) 或者 `build`(生产环境)
    config: (config, { command }) => ({
      alias: {
        react: require.resolve('react')
      }
    }),
    configResolved(resolvedConfig) {
      // 记录最终配置, 这里不建议再修改
      __config = resolvedConfig;
    },

    // 在其他钩子中可以访问到配置
    transform(code, id) {
      console.log(__config);
    },

    configureServer(server) {
      // 姿势 1: 在 Vite 内置中间件之前执行
      server.middlewares.use((req, res, next) => {
        // 自定义请求处理逻辑
      });
      // 姿势 2: 在 Vite 内置中间件之后执行
      return () => {
        server.middlewares.use((req, res, next) => {
          // 自定义请求处理逻辑
        });
      };
    }
  };
}
