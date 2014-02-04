
/**
 * Module dependencies.
 */

var Readable = require('stream').Readable;
var co = require('co');
var finished = require('finished');

/**
 * Expose `genBody`.
 */

module.exports = genBody;

/**
 * Generator stream body type.
 *
 * @return {Function}
 */

function genBody(){
  return function*(next){
    var ctx = this;
    this.genBody = function(gen){
      var stream = Readable();
      var fn = co(gen);
      
      stream._read = function(){
        fn(false, function(err, data){
          if (err) return ctx.onerror(err);
          data = data || null;
          stream.push(data);
        });
      };
      
      finished(ctx.res, function(err){
        if (err) return ctx.onerror(err);
        fn(true, ctx.onerror);
      });
      
      return stream;
    };
    yield next;
  };
}
