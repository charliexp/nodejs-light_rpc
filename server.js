var light_rpc = require('./index.js');
var port = 5556;

var rpc = new light_rpc({
    combine: function(a, b, callback){
       // callback(a + b);
	   if( a == 'ledmq.broker.msg' )
	   {
		   callback('ok');
	   }
	   else
	   {
		   	   callback('error');
	   }
    },
	msg: function(a, b,c, callback){
        callback(a + ' '+ b+c);
    },
    multiply: function(t, cb){
        cb(t*2);
    }
});
rpc.listen(port);
console.log('listen port', port);
