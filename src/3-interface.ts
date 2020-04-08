// interface List {
//   id: number;
//   name: string;
// }

// interface Result {
//   data: List[]
// }

// let result = {
//   data: [
//     {
//       id: 1, name: 'A',
//     },
//     {
//       id: 2, name: 'B'
//     }
//   ]
// }




// 1. 指定对象为某接口类型时，对象不能包含多余的属性
// interface A {
//   id: number; 
//   name: string
// }

// let obj: A = {
//   id: 2,
//   name: 'B',
//   age: 3   // 报错，age 不在 A 上
// }



// 2. 当接口作为函数参数的类型时，可以包含多余的属性:  
interface A {
  id: number; 
  name: string;
}

let obj = {
  id: 2,
  name: 'B',
  age: 3   // 报错，age 不在 A 上
}

function test(a: A) {}

test(obj)  // 不会报错，尽管 obj 比 A 接口多了 age 属性


// test({   // 依然会报错
//   id: 2,
//   name: 'B',
//   age: 3
// })

// test({   // 不会报错
//   id: 2,
//   name: 'B',
//   age: 3
// } as A)


// interface A {
//   [key: string]: any;
// }

// test({
//   id: 2,
//   name: 'B',
//   age: 3
// })



// 3. 可选属性
// interface A {
//   id: number; 
//   name: string;
//   age?: number
// }

// function test1 (a:A){
//   if(a.age) {

//   }
// }


// 4. 可选属性
// interface A {
//   id: number; 
//   name: string;
//   readonly age: number
// }

// function test1 (a:A){
//   a.age++  // 报错
// }



// 5. 数字索引
// interface StringArray {
//   [index: number]: string;
// }

// let a1: StringArray = ['1','2','3']



// 6. 字符串索引
// interface Names {
//   [key: string]: string;
// }

// let a2: Names = {
//   a: 'a',
// }

// 7. 索引类型混用
// interface Names {
//   [key: string]: string;
//   [key: number]: string;
// }

// let a2: Names = {
//   a: 'a',
//   1: '1'
// }


// 8. number 索引必须兼容 string 索引
// interface Names {
//   [key: string]: string;
//   [key: number]: number; // 报错
// }

// interface Names {
//   [key: string]: string | number;
//   [key: number]: number; // 不会报错
// }

