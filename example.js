
var koa = require('koa');
var genBody = require('./');
var wait = require('co-wait');

var app = koa();
app.use(genBody());
app.use(function*(){
  this.body = this.genBody(function*(end){
    if (end) return console.log('end');
    yield wait(1000);
    return Date.now() + '\n';
  });
});
app.listen(3000);
