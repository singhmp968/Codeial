// this will act as a observer or the server and this will going to revcive all the incomming from the user which are listener or subscriber
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log('new connection recived @',socket.id);
        
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
        // geting or reciving join_room event from chat engine
        socket.on('join_room',function(data){ // like emit is used for sending a event we have "ON" for reciving a event
            console.log('joining request rec',data);
            socket.join(data.chatroom); // it will check wgether a user with name of data.chatroom then it will get connect automatially
            // we are emmiting or sending a event to tell that we have join the chat room 
            io.in(data.chatroom).emit('user_joined',data) // sendinfg the data .we are emiting in specific chat room othet wise we can do directly emit

        }) ;

        // change : detecting send_message from client side i.e chat_engine to broadcast every one in the room
        socket.on('send_message',function(data){ // data comming from send message
            // we are emmiting or sending a event to tell that we have join the chat room 
            // here by doing this we are sending data to the server fro client then we are reciving the data and broacast it 
            io.in(data.chatroom).emit('recive_message',data);
        })
    });

   
}