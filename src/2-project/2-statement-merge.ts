// 1. 将各处同名的类型声明，合并为一个类型声明

interface IntA { 
  x: number;
}

interface IntA { 
  y: number;
}

// 那么此时 inta 就拥有 x, y 两个属性
let inta: IntA = {
  x: 1,
  y: 1
}

// 2. 同名的成员，类型必须兼容
interface IntB { 
  x: number;
}

interface IntB { 
  y: number;
  // x: string;  // 报错，与上面的 x: number 不兼容
}

// 2.1 同名的成员函数，可以类型不兼容，这时候相当于函数重载
interface IntC { 
  x(name: number): number
}

interface IntC { 
  x(name: string): string
}

let intc: IntC = {
  x: function(value: any) {  // 不会报错
    return value
  }
}

// let intc: IntC = {
//   x: function(value: number) {  // 报错，value 类型必须兼容 number 和 string
//     return value
//   }
// }



// 3. 命名空间和函数的声明合并
function Lib() {}
namespace Lib {
  export let version: string = '1.0';
}

console.log(Lib.version);  // 1.0

// 4. 命名空间和类的声明合并
class L {}
namespace L {
  export let state: number;
}

console.log(L.state);  // 1

// 5. 命名空间和枚举进行声明合并
enum Color {
  Green = 1,
  Yellow
}
namespace Color {
  export function mix() {}
}

console.log(Color); // { Green: 0, Yellow: 1, mix: () => {} }
