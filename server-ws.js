const wsPackage = require('ws')
const wsPort    = 9999 
const wsServer  = new wsPackage.Server({port: wsPort})
let   wsClients = []

// CONNECT /:userID
// wscat -c ws://localhost:9999
wsServer.on('connection', function (wsClient, req) {

    //let userID = parseInt(req.url.substr(1), 10)
    wsClients.push(wsClient)
    //console.log(req)
    wsClient.send('connected')

    wsClient.on('message', function(msg) {
      console.log('received ' + msg)
      for (let wsClnt of wsClients) {
         wsClnt.send(msg)
      }
      //let messageArray = JSON.parse(message)
      //let otherWSClient  = wsClients[messageArray[0]]
     // if (otherWSClient) {
	// console.log('sent to ' + messageArray[0] + ': ' + JSON.stringify(messageArray))
       //  otherWSClient.send(JSON.stringify(messageArray))
     // }
    })

    wsClient.on('close', function () {
      console.log('deleted')
    })
})

console.log('Сервер запущен на '+wsPort+' порту')
