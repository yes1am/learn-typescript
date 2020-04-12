namespace Shape {
  const pi = Math.PI;
  export function circle(r: number) {
    return pi * r ** 2;
  }
}


console.log(Shape.circle); // 不会报错
// console.log(Shape.pi);  // 报错，没有导出 pi


// 命名空间成员别名
// 在上述的代码中，我们必须使用 Shape.circle 来访问 circle 成员

import ccc = Shape.circle  // 将 Shape.circle 重命名为 ccc
console.log(ccc(2));  // 相当于 Shape.circle(2)
