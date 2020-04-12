declare function moduleLib(options: moduleLib.Options): void

declare namespace moduleLib {
  const version: string;
  function doSomeThing(): void
  interface Options {
    [key: string]: string
  }
}

export = moduleLib  // 必须进行导出， 这种写法的兼容性是最好的

// export default moduleLib  // 这样也行