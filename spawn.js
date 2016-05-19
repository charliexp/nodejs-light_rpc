/*************************************************************************\
 * File Name    : spawn.js                                               *
 * --------------------------------------------------------------------- *
 * Title        :                                                        *
 * Revision     : V1.0                                                   *
 * Notes        :                                                        *
 * --------------------------------------------------------------------- *
 * Revision History:                                                     *
 *   When             Who         Revision       Description of change   *
 * -----------    -----------    ---------      ------------------------ *
 * 12-23-2015      charlie_weng     V1.0          Created the program     *
 *                                                                       *
\*************************************************************************/

var cp  = require('child_process');
var worker;

///////////////////////////////////////////////////////////////////////////
function spawn(server) { 
    //�����ػ�������IPCͨ����˫��ͨ��
    worker = cp.spawn('node', [ server ], {
      stdio: [ 0, 1, 2, 'ipc']
    });
	
    //�����ӽ��̣��������ʱ����
    worker.on('exit', function(code) {
        if(code !== 0) {           
          console.log('worker is shut down, restarting...');
          spawn(server);//��������
        };
    });
    //�յ��ӽ�����Ϣ
    worker.on('message', function(msg) {
        console.log(msg);
    });
};

/////////////////////////////////////////////////////////////////////////// 
function main() {
	
    spawn('mqttsv.js'); //Ҫ�ػ��Ľ����ļ�
    process.on('SIGTERM', function() {
        worker.kill();
        process.exit(0);
    });
};

////////////////////////////////////////////////////////////////////////// 
main();

