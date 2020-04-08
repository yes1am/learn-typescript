// 1. 四种定义函数的方式

function add1(x: number, y: number) {
  return x + y;
}

let add2: (x: number, y: number) => number;

type add3 = (x: number, y: number) => number;

interface add4 {
  (x: number, y: number): number;
}


// 2. 函数参数
// ts 中函数实参个数必须和形参一致
// add1(1)  // 报错
add1(1, 2)   // 不会报错
// add1(1, 2, 3)   // 报错


// 3. 如果有的参数是可选的,那么需要使用可选参数
function add5(x: number, y?: number) {
  return y ? x + y : x;
}

add5(1)  

// 可选参数必须在，必选参数之后
// function add6(x: number, y?: number, z:number) {  // 报错
// }

// 函数默认值
function add7(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q;
}

// add7(1,3) // 报错, x= 1, y = 3, z 作为必传参数却没有传参
console.log(add7(1, undefined, 3))


// 4. 剩余参数
function add8(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}

console.log(add8(1,2,3,4))


// 5. 函数重载
// 如果两个函数，函数名称相同，但是函数参数类型，或者参数个数不相同，那么就实现了函数重载
// 好处是，不用为了相似功能的函数，取不同的名称，这样增加了代码的可读性

function add9(...rest: number[]): number;
function add9(...rest: string[]): string;
function add9(...rest: any[]): any {       // 在最为宽泛的类型中，实现真正的函数体
  if(typeof rest[0] === 'string') {
    return rest.join('')
  } else if(typeof rest[0] === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}

console.log(add9(1,2,3))         // 6
console.log(add9("a","b","c"))   // abc

