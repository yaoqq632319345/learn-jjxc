export default function TestComp() {
  return (
    // 类型报错需要添加声明类型, 见: @/types/shim.d.ts
    <button
      bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
      text="sm white"
      font="mono light"
      p="y-2 x-4"
      border="2 rounded blue-200"
    >
      Button
    </button>
  );
}
