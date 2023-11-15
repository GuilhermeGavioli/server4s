const http = require('http');
const WebSocket = require('ws');

// const {createClient} = require('redis')
// const client = createClient({
//   host: "localhost", // Redis server host
//   port: 6379,        // Redis server port
// });

// client.connect()
// // Check if Redis connection is successful
// client.on("connect", () => {
//   console.log("Connected to Redis");
// });

// client.on("error", (err) => {
//   console.error("Redis client error:", err);
// });

const server = http.createServer((req, res) => {
  // Handle your HTTP requests here if needed
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running.');
});

const wss = new WebSocket.Server({ server });

const { decodeAccessToken, generateAccessToken, generateRefreshToken, isRefreshTokenValid, verifyAccessToken } = require('./Utils');
async function protection(request, response, next) {
  try {
      const access_token = request.header('Authorization');

      const is_token_valid = verifyAccessToken(access_token);
      if (!is_token_valid) throw new Error('Unauthorized')

      const decoded = decodeAccessToken(access_token);
      if (!decoded) throw new Error('Unauthorized')
      
      //query database or not
      response.locals.id = decoded.id;
      return next();
      
  } catch (err) {
      response.status(403).json({ error: 1, message: err.message}).end();
  }
}

let arr = [

]

let stored = []

wss.on('connection', (socket, b) => {
  // WebSocket connection established
  console.log('WebSocket connection opened.');
  console.log(b.url)
  if (b.url.substring(0, 8) != '/?token=')   socket.close()
  const token = b.url.substring(8)
  if (!token)   socket.close();


  const is_token_valid = verifyAccessToken(token);
  if (!is_token_valid)   socket.close()

  const decoded = decodeAccessToken(token);
  if (!decoded)   socket.close()
    //throw new Error('Unauthorized')


  arr.push({ token: token, id: decoded.id, name: decoded.name, socket })


  // const is_token_valid = verifyAccessToken(access_token);
  //     if (!is_token_valid) return

  //     const decoded = decodeAccessToken(access_token);
  //     if (!decoded) return


  // Handle WebSocket messages and events here
  socket.on('message', (data) => {

    const messageString = data.toString('utf8');
    const message = JSON.parse(messageString)
    
    if (message.TYPE == 'SEND_MESSAGE') {

      console.log(message)
      const sender = arr.find(el => el.token == message.token)
      if (!sender) return; //todo
      console.log(sender)

      const response = { TYPE: 'MESSAGE_ACK', ack_id: message.ack_id }
      socket.send(JSON.stringify(response))


      const receiver = arr.find(el => el.id == message.receiver)
      if (!receiver){ // store message
        stored.push({receiver_id: message?.receiver, text: message.text, sender: {id: sender.id, name: sender.name}}) //fix
      } else {
        receiver?.socket?.send(JSON.stringify({TYPE: 'NEW_INCOMING_MESSAGE', text: message.text, sender: {id: sender.id, name: sender.name}}))
      }



    }

  });

  socket.on('close', () => {
    console.log('WebSocket connection closed.');
    arr = arr.filter(function(el) {
      return el.socket !== socket;
    });
    console.log(arr)
    // Handle WebSocket connection close events.
  });
});

  
server.listen(81, () => {
  console.log('WebSocket server is listening on port 81.');
});

module.exports = {server, stored}