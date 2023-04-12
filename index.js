import path from 'path';
import express from 'express';
const app = express();
import  http from 'http';
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
import {Server} from'socket.io';
const io = new Server(server);
console.clear();
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname,'static')))

io.on('connection',(socket)=>{
   socket.on('chat message',function(data){
      io.emit('chat message',{name:data.name, body:data.body});
   })
})

 
server.listen(PORT)
