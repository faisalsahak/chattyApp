// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function getRandomColor(){
  let colors = ['#f44242', '#f4e542', '#4e42f4', '#42f4c5'];
  return colors[(Math.floor(Math.random()* colors.length))];
}

// Send data object to each connected client
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
    console.log('Client color: ', client.color);
    // client.color = getRandomColor();
  });
};



 let usersOnline = 0;
wss.on('connection', (ws) => {
console.log("Client Conntected")
  usersOnline = wss.clients.length;
console.log("client color", ws.clients)
  // Call broadcast with usercount object
  wss.broadcast({
    type: 'userCount',
    info: {
      usersOnline: usersOnline,
    }
  });

  ws.on('message', function incoming(newMessage) {
    let chatFields = JSON.parse(newMessage);
    chatFields.info.id = uuid.v1();


    if (chatFields.type === 'postMessage'){
    chatFields.type = 'incomingMessage';
    }

    if (chatFields.type === 'postNotification'){
    chatFields.type = 'incomingNotification';
    }

    // Call broadcast with chatFields object
    wss.broadcast(chatFields);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    usersOnline -= 1;

    // Call broadcast with usercount object
    wss.broadcast({
      type: 'userCount',
      info: {
        usersOnline: usersOnline
      }
    });

  });
});
