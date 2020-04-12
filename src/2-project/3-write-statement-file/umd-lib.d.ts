declare namespace umdLib {
  const version: string;
  function doSomeThing(): void;
}

export as namespace umdLib   // umd 库必须添加这一行

export = umdLib

