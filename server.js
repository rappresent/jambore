var env = process.env;
var argv = require('minimist')(process.argv.slice(2));
var SocketCluster = require('socketcluster').SocketCluster;
var options = {
    timeOut : eval(env.npm_package_timeOut) || 300000,
    sessionAge : eval(env.npm_package_sessionAge) || 900000,
    workers : Number(argv.worker) || Number(env.npm_package_worker) || Number(env.SOCKETCLUSTER_WORKERS) || 4,
    brokers : Number(argv.broker) || Number(env.npm_package_broker) || Number(env.SOCKETCLUSTER_BROKERS) || 1,
    port : Number(argv.port) || Number(env.npm_package_port) || 8000,
    // Switch wsEngine to 'uws' for a MAJOR performance boost (beta)
    wsEngine : env.SOCKETCLUSTER_WS_ENGINE || 'ws',
    appName : argv.name || env.npm_package_name || env.SOCKETCLUSTER_APP_NAME || "Jambore",
    workerController : env.SOCKETCLUSTER_WORKER_CONTROLLER || __dirname + '/worker.js',
    brokerController : env.SOCKETCLUSTER_BROKER_CONTROLLER || __dirname + '/broker.js',
    socketChannelLimit : Number(env.SOCKETCLUSTER_SOCKET_CHANNEL_LIMIT) || 1000,
    crashWorkerOnError : (argv['autoreboot'] || env.npm_package_autoreboot) != false
};
var SOCKETCLUSTER_OPTIONS;
if (env.SOCKETCLUSTER_OPTIONS) {
    SOCKETCLUSTER_OPTIONS = JSON.parse(env.SOCKETCLUSTER_OPTIONS);
}
for (var i in SOCKETCLUSTER_OPTIONS) {
    if (SOCKETCLUSTER_OPTIONS.hasOwnProperty(i)) {
        options[i] = SOCKETCLUSTER_OPTIONS[i];
    }
}
var socketCluster = new SocketCluster(options);