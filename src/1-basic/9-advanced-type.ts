// 1. 交叉类型， 符号为 &
// 将多个类型合并为一个类型，新的类型会具有所有类型的特性,所以很适合对象混入的场景  

interface DogInterface {
  run(): void
}

interface CatInterface {
  jump(): void
}

let pet: DogInterface & CatInterface  // 此时 pet 具有 run 方法和 jump 方法
pet = {
  run: () => {},
  jump: () => {}
}

// 2. 联合类型, 符号为 |
// 表示可以是多个类型中的其中一个
let var1: number | string = 1
let var2: number | string = '1'

// 2.1. 字面量类型的联合类型
// 字面量类型，即明确变量的取值范围
let var3: 1 | 2 | 3;   // 此时 var3 只能取值为 1,2,3 其中之一
let var4: 'a' | 'b' | 'c';   // 此时 var3 只能取值为 'a', 'b', 'c' 其中之一
let var5: 'no';  // 此时 var5 只能是 no

// 2.2 对象的联合类型，只能返回公共的属性
class LDog implements DogInterface {
  run(){}
  eat(){}
}

class LCat implements CatInterface {
  jump(){}
  eat(){}
}

function getPet(isDog: boolean) {
  let pet = isDog ? new LDog() : new LCat()
  pet.eat()  // 此时 pet 为 Dog | Cat， 因此只能调用公有成员
  // pet.jump(); // 报错
  // pet.run(); // 报错
  return pet;
}

// 2.3 接口的联合类型

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Square {
  kind: 'square';
  size: number;
}

type Shape = Rectangle | Square

function area(s: Shape) {
  switch (s.kind) {  // 此时 king 作为公有成员，可以用来做类型保护
    case 'rectangle':
      return s.width * s.height;  //  这里的 s 就是 Rectangle 类型
    case 'square':
      return s.size * s.size;   // 这里的 s 就是 Square 类型
    default:
      break;
  }
}


// 3. 索引类型
// 适合我们想，获取对象的值的场景
let obj = {
  a: 1,
  b: 2,
  c: 3
}

function getValue(obj: any, keys: string[]) {
  return keys.map(key => obj[key])
}

getValue(obj, ['a'])  // 不会报错
getValue(obj, ['x','y']) // 不会报错, 
// 但是我们想约束第二个参数必须是 obj 的 key ，该怎么做？ 这时候就需要用到索引类型


// 三个索引类型的概念
// 索引类型的查询操作符 keyof T, 返回 T 的属性的【字面量联合类型】
interface Obj {
  a: number;
  b: number;
}

let key: keyof Obj;  // key 为 "a" | "b" 类型
key = 'a' // 不会报错
key = 'b' // 不会报错
// key = 'c' // 报错

// 索引类型的访问操作符，T[K], 返回对象 T 的属性 K 的类型
let value: Obj['a'];  // value 为 number 类型，因为 Obj.a 是 number 类型

// T extend U: 表示类型 T 会必须具有类型 U 的属性

// 两个泛型类型，分别用来表示函数两个参数的类型
function getValue1<T,K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}

getValue1(obj, ['a'])  // 不会报错
// getValue1(obj, ['x','y']) // 报错, x, y 不是 obj 的属性



// 4. 映射类型
// 从一个旧的类型，生成一个新的类型，比如将一个接口中的所有属性都变为只读

interface A {
  a: string;
  b: string;
}

let va1: A = {
  a: '1',
  b: '1'
};

va1.a = '2'

// 只读映射
type ReadonlyObj = Readonly<A>

let va2: ReadonlyObj = {
  a: '1',
  b: '1'
};
// va2.a = '2' // 报错, a 属性只读

// 可选映射，将接口中的属性都变成可选的属性
type PartialObj = Partial<A>;  // 属性 a, b 都变成可选的了
// 结果
// PartialObj = {
//   a?: string;
//   b?: string;
// }

// Pick 映射, 选择一个接口中的一些属性，组成新的类型
type PickObj = Pick<A, 'a'>;
// 结果
// PickObj = {
//  a: string;
// }

// Record 映射, 生成一个接口，其中接口属性为第一个参数，属性值为第二个参数
type RecordObj = Record<"a" | "b", string>
// 结果
// RecordObj = {
//   a: string;
//   b: string;
// }


// 5. 条件类型
// T extends U ? X : Y;
// 如果 T extends U，那么返回 X 类型，否则返回 Y 类型
type TypeName<T> =
  T extends string ? 'string' : 
  T extends number ? 'number' : 
  T extends boolean ? 'boolean' : 
  T extends undefined ? 'undefined' : 
  T extends Function ? 'function' : 
  "object";

type T1 = TypeName<string>;  // 那么 T1 就是字面量 'string'
type T2 = TypeName<string[]>;  // 那么 T2 就是字面量 'object'

// ( A | B ) extends U ? X : Y
// 等价于
// ( A extends U ? X : Y） | ( B extends U ? X : Y）
type T3 = TypeName<string | string[]> // 那么 T3 就是字面量 "string" | "object" 的联合类型

// 实现类型的过滤 ,如果 T extends U， 那么返回 never， 否则返回 T,
// 相当于找到存在于 T 中，但是不存在于 U 中属性
type Diff<T, U> = T extends U ? never : T;

type T4 = Diff<"a" | "b" | "c", "a" | "b">;  // 那么 T4 就是字面量 "c"

// 原理是
// Diff<"a" | "b" | "c", "a" | "b">
// 等价于 Diff<"a", "a" | "b"> | Diff<"b", "a" | "b"> | Diff<"c", "a" | "b">
// 等价于 nerver | never | "c"
// 等价于 "c"


// 5.1 实现一个 NotNull 类型,即过滤类型中的 null 和 undefined
type NotNull<T> = Diff<T, null | undefined>
type T5 = NotNull<null | undefined | "5">  // 那么 T5 就是字面量 "5"
// 而实际上，Diff 和 NotNull 官方已经实现了
// Diff 的官方实现是 Exclude<T, U>
// NotNull 的官方实现是 NotNullable<T>

// 抽取属性，Extract<T,U>，在 T 中，找到能赋值给 U 的 类型
type T6 = Extract<"a" | "b", "a" | "c">  // T6 为字面量 "a", 

// 获取函数返回值类型,ReturnType<T>, 接受一个函数类型(而不是真正的函数)，返回函数的返回值类型
type addFun = (x: number, y: number) => number;
interface addFun1 {
  (x: number, y: number): string;
}
type T7 = ReturnType<addFun>   // T7 就是 number 类型
type T8 = ReturnType<addFun1>   // T7 就是 string 类型