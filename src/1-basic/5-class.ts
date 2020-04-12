// 1. 基础类
class Dog {
  constructor(name: string) {
    this.name = name
  }
  name: string;  // 成员属性必须添加类型注解，不添加会报错
  run(){}
}

let dog = new Dog('hi')

console.log(Dog.prototype)  // constructor, run
console.log(dog)   // name
// 即 类的方法，是在类的原型上，而类的属性，是在实例自身上

// ts 中，实例的属性必须具有初始值，或者在构造函数中被初始化，或者该属性是可选属性



// 2. 类的继承

class Husky extends Dog {
  constructor(name: string, color: string) {
    super(name)
    this.color = color;
  }
  color: string;
}

let husky1 = new Husky('hh', 'red')
console.log(husky1);  // name:hh, color: red


// 3. 类的成员修饰符

// 所有的属性和方法默认都是 public，即可以在类中被访问，可以被类的实例中访问，可以被子类访问


// private： 表示私有成员或方法，表示只能在类中被访问，不能被类的实例访问，也不能被子类访问
class Dog1 {
  name: string = 'name';  // 成员属性必须添加类型注解，不添加会报错
  private age: number =  123;
  run(){
    console.log(this.age)   // 不会报错，private 支持类中被访问
    this.pri()  // 不会报错，private 支持类中被访问
  }
  private pri() {}
}
let dog1 = new Dog1();
dog1.run()  // 不会报错，public 支持任意访问
console.log(dog.name)  // 不会报错，public 支持任意访问

// dog1.pri()  // 报错，private 不能在实例被访问
// console.log(dog1.age)  // 报错，private 不能在实例被访问

class LittleDog extends Dog1 {
  say() {
    this.run() // 不会报错，public 支持任意访问
    console.log(dog.name)  // 不会报错，public 支持任意访问

    // this.pri();  // 报错，private 不能在子类访问
    // console.log(this.age)  // 报错，private 不能在子类访问
  }
}

// 如果一个类的构造函数是 private, 那么这个类不能被实例化也不能被就继承
class Dog2 {
  private constructor(name: string) {
    this.name = name;
  }
  name: string;
}

// new Dog2('hh')  // 报错，不能被实例化
// class Husky2 extends Dog2 {  // 报错，不能被继承

// }

// protected: 表示属性或方法只能在类，以及子类中被访问，不能被实例所访问
class Dog3 {
  name: string = 'name';  // 成员属性必须添加类型注解，不添加会报错
  protected age: number =  123;
  run(){
    console.log(this.age)   // 不会报错，protected 支持类中被访问
    this.pri()  // 不会报错，protected 支持类中被访问
  }
  protected pri() {}
}
let dog3 = new Dog3();
dog3.run()  // 不会报错，public 支持任意访问
console.log(dog.name)  // 不会报错，public 支持任意访问

// dog3.pri()  // 报错，protected 不能在实例被访问
// console.log(dog3.age)  // 报错，protected 不能在实例被访问

class LittleDog3 extends Dog3 {
  say() {
    this.run() // 不会报错，public 支持任意访问
    console.log(dog.name)  // 不会报错，public 支持任意访问

    this.pri();  // 不会报错，protected 不能在子类访问
    console.log(this.age)  // 报错，protected 不能在子类访问
  }
}

// 如果一个类的构造函数是 protected, 那么这个类不能被实例化,  只能被就继承，相当于声明了基类
class Dog4 {
  protected constructor(name: string) {
    this.name = name;
  }
  name: string;
}

// new Dog4('hh')  // 报错，不能被实例化
class Husky4 extends Dog4 {  // 不会报错，可以被继承

}


// 4. readonly 只读属性
// class Dog5 {
//   readonly name: string = 'name';
//   run() {
//     this.name = 'newName'  // 报错，不能修改只读属性
//   }
// }


// 5. 构造函数参数，添加修饰符
class Dog6 {
  constructor(name: string){
    this.name = name
  }
  name: string;  // 类型注解
}

class Dog7 {
  // 通过添加构造函数参数的修饰符，即使没有上面的类型注解代码，也不会报错
  constructor(public name: string){
    this.name = name
  } 
}



// 6. static 类的静态成员
class Dog8 {
  static food: string = 'banana'
}

// 只能通过类来访问
console.log(Dog8.food);  // banana

// 不能通过实例来访问
// console.log(new Dog8().food)  // 报错

// 静态成员同样可以被继承
class Husky8 extends Dog8 {}

console.log(Husky8.food);  // banana



// 7. 抽象类
// js 中没有抽象类，TS 中对 js 进行了扩展，所谓抽象类，即只能被继承，不能被实例化的类

// 定义抽象类
abstract class Animal {
  say() {
    console.log(`hi`);
  }

  abstract eat(): void
}
// let ani = new Animal()  // 报错，无法创建抽象类的实例

class Dog9 extends Animal {
  constructor(name: string) {
    super()
    this.name = name;
  }
  name: string;
  eat() {

  }
}

let dog9 = new Dog9('wangwang')
dog9.say()
// console.log(dog9.eat);



// 8. 多态
abstract class Ani {
  abstract eat(): void
}

class Fish extends Ani {
  eat() {
    console.log('fish eat');
  }
}

class Cat extends Ani {
  eat() {
    console.log('cat eat');
  }
}

new Cat().eat()  // cat eat
new Fish().eat()  // fish eat



// 9. this 类型，实现链式调用
class WorkFlow {
  flow1() {
    console.log("flow1 done");
    return this;
  }
  flow2() {
    console.log("flow2 done");
    return this;
  }
}

new WorkFlow().flow1().flow2()  // flow1 done. flow2 done

class MyFlow extends WorkFlow {
  next() {
    return this;
  }
}

let work = new MyFlow()
console.log(new MyFlow().next());
console.log(work.flow1() === work.flow1());