// front end chat engin i.e this will be communicating from the client side
class ChatEngine {
    constructor(chatBoxId,userEmail){
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
        this.socket = io.connect('http://localhost:5000'); // io is a global variable as soon as we included " and it is give to us by socket.io file"
 
        if(this.userEmail){
            this.connectionHandler(); // clling onnection handler
        }
    }
//creating a connection hndler and this will have the to and fore interaction between observer and subscriber
    connectionHandler(){
        let self = this // as this has been utilized @line no 18
        
        // it runs on emit and on here on means detecting an event
        this.socket.on('connect',function(){
            console.log(`connection established using sockets...!`);
        });

        // when this event is emited it will be recive on chat socket 
        self.socket.emit('join_room',{ // creating a event names as joint room
            // sending data i.e which user we need to chat
            user_email:self.userEmail,
            chatroom: 'codeial'
        }); 
    
        // here we are reciving the data from obserer socket i.e user_joined
        self.socket.on('user_joined',function(data){
            console.log('a user joined',data);
        })
    
    //sending  message on clicking send message nutton
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val(); // getting th message from the input box
            if(msg != ''){ // checking if it not empty then we are sendig the message to the observer side
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom: 'codeial'
                })
            }
        
        });
        // detecting recive_message
        self.socket.on('recive_message',function(data){
            console.log('message recived',data.message)
       

        let newMessage = $('<li>');
        let messageType = 'other-message';

        if (data.user_email == self.userEmail){
            messageType = 'self-message';
        }// we are checking if data.useremail == the current user tehn we are changing the alignment of the message
        
        newMessage.append($('<span>', {
                'html': data.message
            }));

        newMessage.append($('<sub>', {
                'html': data.user_email
            }));

        newMessage.addClass(messageType); // adding to newMessage to messageType class

        $('#chat-messages-list').append(newMessage); // appending to  chat-message-list

    });
}
}