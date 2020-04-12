globalLib({name: 'globalLib'})

console.log(globalLib.version);

globalLib.doSomeThing()


import moduleLib from './module-lib';

moduleLib({name: 'moduleLib'})

console.log(moduleLib.version);

moduleLib.doSomeThing()

// import umdLib from './umd-lib'

console.log(umdLib.version);

umdLib.doSomeThing()


// 1. 模块插件，注意，不是 declare module moduleLib， 而是 declare module './module-lib'， 即应该指定的是路径
// 扩展我们的模块
declare module './module-lib' {
  let oldVersion: string;
}
moduleLib.oldVersion = '1234'
console.log(moduleLib.oldVersion);

// 第三方模块
import moment from 'moment'

declare module 'moment' {
  const aaa: string;
}

console.log(moment.aaa);  // 不会报错

// 2. 扩展全局插件
declare global {
  namespace globalLib {
    function doAnyThing(): void;
  }
  interface Console {
    aaa(name: string): void
  }
}

globalLib.doAnyThing; // 不会报错，存在该属性
console.aaa;  // 不会报错了，存在该属性