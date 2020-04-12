// 类型推断，即有时候不必指定变量的类型，或者是函数返回值的类型，TS 会根据一些规则，自动的为我们推断出相应的类型

// 1. 基础类型推断
let a;  // any 类型
let b = 1;  // number 类型
let c = [];  // any[] 类型
let d = [1];  // number[] 类型
let e = ( x = 1 ) => x + 1;  // (x?: number) => number 类型

// 2. 最佳类型推断: 即当需要从多个类型中，推断中一个类型时，TS 会尽力推断出一个兼容当前所有类型的通用类型
let f = [1, null]; // 因此 number 和 null 并不兼容，因此 TS 会推断出 (number | null)[] 类型

// 3. 上下文类型推断
// 以上的结果都是从右边，推测左边的类型，TS 还支持从左边推测右边的类型

// 此时 TS 能推断出 e 是 Event 类型
document.documentElement.onscroll = (e) => {
  // 
}

// 4. 类型断言
// 有时候 TS 的类型推断不符合你的预期，并且你完全有自信，比 TS 更了解你的代码，这时候可以使用类型断言来覆盖 TS 的类型推论


// let foo = {};
// foo.bar = 1  // 报错，{} 上不存在 bar 属性

// 于是可以使用类型断言
interface Bar {
  bar: number
}
let foo = {} as Bar;
foo.bar = 1




// 5. 类型兼容性
// 当一个类型 Y 可以被赋值给另一个类型 X 的时候，我们说类型 X 兼容类型 Y
// X 兼容 Y : X (目标类型) = Y (源类型)

// let fa = null;  
// fa = 1;  // 不报错，null 兼容 number，number 是 null 类型的子类型

// let fb = 1;
// fb = null  //strictNullChecks 为 true 的情况下会报错，number 不兼容 null， nul 不是 number 的子类型



// 6. 接口兼容性
interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any;
}

let x: X = {a:1,b:2}
let y: Y = {a:1,b:2,c:3}

x = y;  // 不会报错，X 兼容 Y
// y = x;  // 报错

// 7. 函数兼容性
type Handler = (a: number, b: number) => void;
function hof(handler: Handler) {
  return handler
}

// 目标函数为 Handler 类型，真正的实参为源函数，兼容的三个条件，
// 条件1. 参数个数): 目标函数参数个数,要多余源函数参数个数

// 1.1 固定参数个数的情况
function handler1(a: number) {}
hof(handler1)  // 不会报错
function handler2(a: number, b: number, c: number) {}
// hof(handler2)   // 报错

// 1.2 参数个数不确定的情况
// 可选参数和剩余参数
let fun1 = (a:number, b: number) => {}
let fun2 = (a?:number, b?: number) => {}
let fun3 = (...args: number[]) => {}

// 1.2.1 固定参数可以兼容可选参数和剩余参数
fun1 = fun2;  // 不会报错
fun1 = fun3;  // 不会报错

// 1.2.2. 可选参数不兼容固定参数和剩余参数, 为了兼容可以设置 strictFunctionTypes: false
// fun2 = fun1;  // 报错
// fun2 = fun3;  // 报错

// 1.2.3. 剩余参数可以兼容固定参数和可选参数
fun3 = fun1;  // 不会报错
fun3 = fun2;  // 不会报错

// 条件2. 参数类型): 参数类型必须兼容
type Handler1 = (a: number, b: number) => void;
function hof1(handler: Handler) {
  return handler
}
let handler3 = (a:number) => {}
hof1(handler3)  // 不会报错，参数类型兼容

// let handler4 = (a:string) => {}
// hof1(handler4)  // 报错，参数类型不兼容


interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d;  // 不会报错
// p2d = p3d;  // 报错，这和接口兼容性不一样，【接口兼容性，属性少的，兼容属性多的】但是这里不一样，
// 可以这样理解，把 Point3D 当做三个参数的，Point2D 当做两个参数，那么符合函数的规则，【参数多的兼容参数少的】


// 条件3. 返回值类型): 目标函数的返回值类型，必须与源函数的返回值类型相同，或者是源函数返回值类型的子类型

let fun5 = () => ({name:'name'})
let fun6 = () => ({name: 'name', age: 'age'})

fun5 = fun6;  // 不会报错
// fun6 = fun5;  // 报错



// 8. 函数重载
// 真正实现函数功能的函数叫做源函数
function overload(a: number, b: number) : number;  // 目标函数
function overload(a: string, b: string) : string;  // 目标函数
function overload(a: any) : any {   // 不会报错，目标函数参数个数，多于源函数参数个数

}

// function overload1(a: number, b: number) : number;  // 目标函数
// function overload1(a: string, b: string) : string;  // 目标函数
// function overload1(a: any, b:any, c: any) : any {   // 报错，目标函数参数个数，少于源函数参数个数

// }


// 9. 枚举类型兼容性

// 枚举类型与 number 类型完全兼容

enum Fruit {
  Apple,
  Banana
}

enum Color {
  Red,
  Blue
}

let fruit: Fruit = 3;  // 不会报错

let num = 1;
num = Fruit.Apple;  // 不会报错

// 枚举类型之间完全不兼容
// let color: Color.Red = Fruit.Apple;  // 报错
let apple: Fruit = Fruit.Apple;   // 不会报错
// let apple1: Fruit.Banana = Fruit.Apple;  // 报错



// 10. 类的兼容性

// 和接口的兼容性类似，属性少的，兼容属性多的。如果属性完全相同，则完全兼容

// 完全兼容
class A1 {
  id: number = 1;
}

class B1 {
  id: number = 1;
}

let a1 = new A1()
let b1 = new B1()

a1 = b1;  // 不会报错
b1 = a1;  // 不会报错


// 属性少的，兼容属性多的
class A2 {
  id: number = 1;
}

class B2 {
  id: number = 1;
  name1: string =  'name1'
}

let a2 = new A2()
let b2 = new B2()

a2 = b2;  // 不会报错
// b2 = a2;  // 报错, 不兼容



// 另外类的兼容性，不会涉及构造函数和静态成员的比较
class A3 {
  constructor(a: number, b: number) {}
  id: number = 1;
}

class B3 {
  static b:number = 2;
  constructor(a: string) {}
  id: number = 1;
}

let a3 = new A3(1,2)
let b3 = new B3('1')

a3 = b3;  // 不会报错
b3 = a3;  // 不会报错


// 但是如果涉及到私有成员，则又不兼容了
class A4 {
  private id: number = 1;
}

class B4 {
  private id: number = 1;
}

let a4 = new A4()
let b4 = new B4()

// a4 = b4;  // 报错
// b4 = a4;  // 报错

class A5 extends A4 {}

let a5 = new A5();
a5 = a4;
a4 = a5;



// 11. 泛型兼容性


// 11.1 泛型接口
// 当泛型没有影响接口成员时，是互相兼容的
interface Empty<T> {

}
let obj1: Empty<string> = {}
let obj2: Empty<number> = {}

obj1 = obj2  // 不会报错
obj2 = obj1  // 不会报错

// 当泛型被使用时，则不兼容
interface Empty1<T> {
  value: T;
}
let obj3: Empty1<string> = { value: '1'}
let obj4: Empty1<number> = { value: 1}

// obj3 = obj4  // 报错
// obj4 = obj3  // 报错

// 11.2 泛型函数
let loog1 = <T>(x:T):T => {
  return x
}

let loog2 = <U>(y:U):U => {
  return y
}

loog1 = loog2  // 不会报错
loog2 = loog1  // 不会报错


// 12. 类型保护机制

enum Type {
  Strong,
  Week
}

class Java {
  helloJava() {
    console.log('java');
  }
}

class JavaScript {
  helloJavaScript() {
    console.log('javascript');
  }
}

// function getLanguage(type: Type) {
//   let lang = type === Type.Strong ? new Java() : new JavaScript()
//   if(lang.helloJava) {   // 报错，lang 上未必有 helloJava 类型
//     lang.helloJava()  // 报错
//   } else {
//     lang.helloJavaScript()  // 报错
//   }
//   return lang
// }

// 为了解决以上的问题，我们可以用类型断言 
function getLanguage(type: Type) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  if((lang as Java).helloJava) {   // 不会报错
    (lang as Java).helloJava()  // 不会报错
  } else {
    (lang as JavaScript).helloJavaScript()  // 不会报错
  }
  return lang
}

getLanguage(Type.Strong)

// 但是这不是一个好的解决方案，代码可读性极差，因此引入了类型保护机制
// 类型保护机制: TS 能够在特定的区块中保证变量属于某种特定的属性，可以在此区块中放心的引用此类型的属性，调用此类型的方法。

function getLanguage1(type: Type, x: number | string) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // 四种创建类型保护区块的方法
  // 1. instanceof，判断某个对象是否为某个类的实例
  if(lang instanceof Java) {
    lang.helloJava()  // 不会报错，只要 instanceof 返回 true， 那么这里一定是 Java 类型
  } else {
    lang.helloJavaScript()  // 不会报错，会自动推断为 JavaScript 类型
  }

  // 2. in 关键字, 判断
  if('helloJava' in lang) {
    lang.helloJava() // 不会报错，只要 in 返回 true， 那么这里一定是 Java 类型
  } else {
    lang.helloJavaScript() // 不会报错，会自动推断为 JavaScript 类型
  }

  // 3. typeof 用于判断基本类型
  // if(typeof lang.helloJava !== 'undefined')  // 报错，lang 不一定有 helloJava 方法
  // 我们传入一个新的参数 x: number | string
  if(typeof x === 'string') {
    x.length  // 不会报错，只要 typeof x === 'string' 为 true，这里就是 string 类型
  } else {
    x.toFixed  // 不会报错，这里就是 number 类型
  }

  // 4. 创建类型保护函数
  // lang is Java 叫做类型谓词, 只要返回 true， 那么就是 Java 类型
  function isJava(lang: Java | JavaScript): lang is Java {
    return (lang as Java).helloJava !== undefined
  }
  if(isJava(lang)) {
    lang.helloJava  // 不会报错，这里就是 Java 类型
  } else {
    lang.helloJavaScript  // 不会报错，这里就是 JavaScript 类型
  }

  return lang
}