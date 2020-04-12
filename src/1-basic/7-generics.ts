// 泛型, 不预先确定的数据类型，具体的类型在使用的时候才能确定


// 1. 泛型函数与泛型接口
// 泛型函数
function log<T>(value: T): T {
  console.log(value);
  return value;
}

// 两种调用方式
// 一种是手动传入类型
log<string[]>(['a'])

// 另一种是使用 TS 的类型推断
log(['a'])


// 使用泛型类型，定义函数
type Log = <T>(value: T) => T;
let myLog: Log = (value) => value;
myLog(['a'])


// 使用泛型接口，定义函数
interface Log1 {
  <T>(value: T): T;
}
let myLog1: Log1 = (value) => value;
myLog1(['a'])

// 我们还可以使用泛型，约束接口的其他成员
interface Log2<T> {
  (value: T): T
  name1: T;
}

let myLog2 = ((value) => value) as  Log2<string[]>;
myLog2(['a'])
myLog2.name1 = ['a'];

// 默认类型
interface Log3<T = string> {
  (value: T): T
  name1: T;
}

let myLog3 = ((value) => value) as Log3;  // 不会报错
myLog3('a')
myLog3.name1 = 'a';


// 2. 泛型类与泛型约束

// 使用泛型 T 来约束泛型成员
class Log4<T> {
  run(value: T): T {
    console.log(value);
    return value;
  }
}

// new Log4<string>().run(1) // 报错，此时 run 的参数必须是 string
new Log4<string>().run('1') // 不会报错

// 如果不传入类型参数，那么 run 方法可以接受任意类型
new Log4().run(1)   // 不会报错
new Log4().run([])  // 不会报错
new Log4().run({})  // 不会报错


// 但是泛型不能约束静态成员(static)
// class Log5<T> {
//    static name1: T;  // 报错，静态成员不能引用类型参数
// }

// 2.1 泛型约束
// 即，我们对泛型也是有要求的，希望它符合一些规范，比如我们希望该泛型存在 length 属性
function log6<T>(value: T): T {
  // console.log(value.length);  // 报错， T 可以是任意类型，所以不一定有 length 属性
  return value;
}

// 此时我们需要预先设置一个约束接口
interface Length {
  length: number;
}

function log7<T extends Length>(value: T): T {
  console.log(value.length);  // 不会报错， T 必须含有 length 属性
  return value;
}

// log7(1);  // 报错，number 没有 length 属性
log7('1');  // 不会报错，string 函数 length 属性