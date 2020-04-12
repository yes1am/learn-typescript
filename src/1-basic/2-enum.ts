// // 1. 数字枚举
// enum Code {
//   Success = 0,
//   Error = 1,
//   Unknown = 2
// }

// console.log(Code.Success)  // 0
// console.log(Code[0])       // Success



// // 2. 字符串枚举
// enum Message {
//   Success = '请求成功',
//   Error = '请求报错',
// }

// console.log(Message.Error)
// // console.log(Message['\u8BF7\u6C42\u62A5\u9519'])  // 报错



// // 3. 异构枚举
// enum Answer {
//   N,
//   Y = 'yes',
// }

// console.log(Answer.N)
// console.log(Answer.Y)



// // 4. 枚举的性质
// // Code.Success = 2;
// // Code.b = 2

// // 5. 枚举成员的分类
// enum Char {
//   a,
//   b = Char.a,
//   c = 1 + 3,
//   d = Math.random(),
//   e = '123'.length
// }

// console.log(Char.d,"#")



// // compute member 之后的成员必须首先进行赋值
// enum Char1 {
//   a = Math.random(),
//   // b   // 报错
//   b = 1  // 不会报错
// }



// // 6. 常量枚举
// const enum Month {
//   JAN =  '1',
//   FEB =  '2',
//   MAR = '3'
// }

// console.log(Month.FEB === '2')



// // 7. 枚举类型, 枚举本身和枚举成员都可以作为类型
// enum Num {
//   a,
//   b
// }

// // let a: Num = 2
// let b: Num.b = 2



// // 不同的枚举之间是不能进行比较的
// enum A {
//   a,
//   b
// }
// // A.a === A.b  // 报错
// A.a < A.b   // 不会报错

// enum B {
//   a = 0,
//   b = 1
// }
// // A.a === B.a  // 报错
// A.a < B.a    // 不会报错



// // 字符串枚举的值，只能是枚举成员的类型
// enum C {
//   a = 'a',
//   b = 'b'
// }

// // let c1: C = 'a'  // 报错
// let c2: C = C.a  // 不会报错

// // let c4: C.a = C.b  // 报错，只能是 C.a 自身的类型
// let c3: C.a = C.a  // 不会报错

