(function (root, factory) {
  if(typeof define === 'function' && define.amd) {
    define(factory)
  } else if(typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    this.umdLib = factory()
  }
}(this, function() {
  return {
    version: '1.0',
    doSomeThing() {
      console.log('i am umd');
    }
  }
}))