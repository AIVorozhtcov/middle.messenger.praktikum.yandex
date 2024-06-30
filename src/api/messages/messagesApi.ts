
class MessagesAPI{
    sendMessage(socket: WebSocket, content: string){
        socket.send(JSON.stringify({
            content: content,
            type: 'message',
          }));
    }

    getMessages(socket: WebSocket, offset: string = '0'){
        socket.send(JSON.stringify({
            content: offset,
            type: 'get old'
        }))

    }
}

export default MessagesAPI
