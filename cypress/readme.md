# cypress

1. npm init -y
2. pnpm i cypress @types/cypress -D
3. tsc --init

### tsconfig.json 报错
```
Specified ‘include‘ paths were ‘[“**/*“]‘ and ‘exclude‘ paths were ‘[]‘
```
- 在根目录下新增一个空的ts文件就可以解决报错问题