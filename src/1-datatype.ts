// // 1. 原始类型
// let bool: boolean = true;
// let num: number = 1;
// let str: string = 'abc'
// // str = 1  // 报错



// // 2. 数组
// let arr1: number[] = [1,2]
// let arr2:Array<number> = [1,2]
// // let arr3:Array<number> = [1,'2']  // 报错

// // 如果还要包含字符串类型，需要使用联合类型
// let arr3: Array<number | string> = [1,2,'3']



// // 3. 元祖是特殊的数组，限制了数组元素的类型和个数
// let tuple1: [number,string] = [1,'1']

// // 改变元素类型会导致报错
// // let tuple2: [string,string] = [1,'1']  // 报错

// // 改变元素数量也会报错
// // let tuple3: [string,string] = ['1','1', '1']  // 报错

// // push 方法不会报错
// // tuple1.push(1)  // tuple1: [1,'1',1]
// // 当时访问新增的属性时，会报错
// // tuple1[2]  // 报错



// // 4. 函数，必须给 x,y 添加函数类型注解
// // let add = (x,y) => x +y;  // 报错
// // let add = (x: number,y:number): number => x +y;

// // 函数类型
// // let compute: (x: number, y: number) => number
// // compute = (a, b) => a + b;


// // 5. 对象
// let obj: object = {x:1,b:2}
// // obj.x = 3  // 报错

// let obj1: {x:number;b:number} = {x:1,b:2}
// obj1.x = 3



// // 6. symbol
// let s1: symbol = Symbol()
// let s2 = Symbol()
// console.log(s1 === s2)



// // 7. undefined, null
// let un: undefined = undefined;
// // un = 1    // 报错
// // un = '1'  // 报错

// let nu: null = null;
// // nu = 1    // 报错
// // nu = '1'  // 报错

// let num5: number | undefined = undefined;



// // 8. void 类型
// let noReturn = () => {}


// // 9. any
// let x;
// x = 1;
// x = '2'
// x = () => {}


// // 10. never
// let error = () => {
//   throw new Error('123')
// }

// let endless = () => {
//   while(true) {}
// }