// 类类型接口，即用接口来约束一个类有哪些成员，以及成员的类型, 没有具体的实现
interface Human {
  name: string;
  eat(): void
}

// 1. 使用 implements 表示实现接口，当类实现接口时，必须实现接口中所有属性
class Asian implements Human {
  name = 'asian man';
  eat() {
  }
  sleep() {
  }
}

// 2. 接口只能约束类的公有成员
// class Asian1 implements Human {
//   name = 'asian man';
//   private eat() {   // 报错，不能是 private 成员，只能是 public 成员
//   }
//   sleep() {
//   }
// }



// 3. 接口继承
interface Man extends Human {
  run(): void;
}

interface Child {
  cry(): void;
}

interface Boy extends Man, Child {}

let boy: Boy = {
  run: () => {},
  eat: () => {},
  cry: () => {},
  name: ''
}

// 4. 接口继承类
class Auto {
  state = 1
}

interface AutoInterface extends Auto {
}

// 此时 AutoInterface 即包含 state 属性
let auto: AutoInterface = {
  state: 2
}

// 接口继承类时，不仅继承 public 属性，还继承 private 属性和 protected 属性
class Auto1 {
  state = 1
  private pri = 2
  protected pro = 3;
}

interface AutoInterface1 extends Auto1 {
}

// let auto1: AutoInterface1 = {  // 报错，缺少 pri 和 pro 属性
//   state: 1,
// }
