const version = '1.0'

function doSomeThing() {
  console.log('i am module lib');
}

function moduleLib(options) {
  console.log(options);
}

moduleLib.version = version;
moduleLib.doSomeThing = doSomeThing;

module.exports = moduleLib