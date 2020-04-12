function globalLib(options) {
  console.log(options);
}

globalLib.version = '1.0'

globalLib.doSomeThing = () => {
  console.log("i am global lib");
}