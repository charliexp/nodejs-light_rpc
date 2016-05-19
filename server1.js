/*************************************************************************\
 * File Name    : server.js                                              *
 * --------------------------------------------------------------------- *
 * Title        :                                                        *
 * Revision     : V1.0                                                   *
 * Notes        :                                                        *
 * --------------------------------------------------------------------- *
 * Revision History:                                                     *
 *   When             Who         Revision       Description of change   *
 * -----------    -----------    ---------      ------------------------ *
 * 2-15-2016      charlie_weng     V1.0          Created the program     *
 *                                                                       *
\*************************************************************************/

var light_rpc = require('./index.js');
var cluster   = require('cluster');
var port      = 5556;

var rpc = new light_rpc({
    combine: function(a, b, callback){
       // callback(a + b);
	   if( a == 'msg' )
	   {
		   callback( b +' ok');
	   }
	   else
	   {
		   callback('error');
	   }
    },
	msg: function(a, b,c, callback){
        callback(a + ' '+ b, c);
    },
    multiply: function(t, cb){
        cb(t*2);
    }
});

if (cluster.isMaster) 
{	
        console.log("main process running: pid=" + process.pid);
        var cpus  = require('os').cpus().length
        var procs = Math.ceil(0.8 * cpus)
		
        for (var i = 0; i < procs; i++) 
			cluster.fork();
        
		cluster.on("exit", function (worker, code) {
            if (code != 0) {
                console.log('Worker %d died :(', worker.id);
                cluster.fork();
            }
        });	
} 
else 
{
	rpc.listen(port);
    console.log('server is start with port ' +port + '  cluster worker pid ' + cluster.worker.id);
}
