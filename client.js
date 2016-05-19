var rpc = require('./index.js');
var msg ='';

for(var i=0;i<1000;i++)
{
	msg = msg+i;
}
rpc.connect(5556, 'localhost', function(remote, conn){
//rpc.connect(5556, '114.215.236.92', function(remote, conn){
	for(var i =0; i<1000;i++)
	{			
		remote.combine('msg', i, function(res){
			console.log('res is:', res);
		});
	}
	remote.multiply(1000, function(res){
        console.log('res is:', res);
    });
	
	remote.msg('ledmq.broker.msg', msg,'1', function(res,c){
        console.log('res is:', res+'.....'+c);
        conn.destroy();
        conn.end();
    });
});