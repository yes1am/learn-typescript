declare function globalLib(options: globalLib.options): void;

declare namespace globalLib {
  const version: string;
  function doSomeThing(): void
  interface options {
    [key: string]: string
  }
}

// 1. 声明文件中，只需要声明，不需要具体的实现
// declare namespace globalLib {
//   const version: string = '1.0'; // 报错, 不需要具体的实现
//   function doSomeThing() {} // 报错，不需要具体的实现
// }

// 2. 为什么需要使用 declare 关键字
// 因为 .d.ts 是声明文件，而不是真正的代码，
// 去除 declare， 那么 function xxx() {} 就成了真正的实现了
