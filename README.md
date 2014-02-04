
# koa-gen-body

  Experimenting with generator stream bodies for
  [koa](https://github.com/koajs/koa).
  
  Until https://github.com/joyent/node/issues/7043 is resolved this has to be
  coupled to koa for otherwise there will be no `end` event.
  
  For more rationale see https://github.com/koajs/koa/issues/207 and
  https://github.com/koajs/koa/pull/208.

## Example

```js
var koa = require('koa');
var genBody = require('koa-gen-body');
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
```

## API

### genBody()

### ctx#genBody(fn)

  Create a readable stream that pull data from generator function `fn`.
  
  `fn` will be passed the `end` argument, which if true tells you to end what
  you're doing - useful for cleaning up underlying resources.

## Installation

```bash
$ npm install koa-gen-body
```
## License

  MIT

