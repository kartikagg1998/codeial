// it is the file which is used by client side for sending the request for communication(ie me)

class ChatEngine
{
    constructor(chatBoxId,userEmail)
    {
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;//the emailid of the user who initiates the chat

        this.socket=io.connect('http://localhost:5000');//the request is send for chatting

        if(this.userEmail){//if there is user find then chat box appear for chatting it is for security purpose
            this.connectionHandler();
        }
    }
// it handles the request for connection
    connectionHandler()
    {   let self=this;
        this.socket.on('connect',function()  //on ..detect event, so connect is the first event which occurs on socket
        {
            console.log("connection established using sockets....");
            self.socket.emit('join_room',{  //join room is a event
                user_email:self.userEmail,
                chatroom:'codeial'
            });
           


            self.socket.on('user_joined',function(data)//user_joined is a event and the notification is also come to the user if others user
                                                        // are join chat room
            {
                console.log('a user joined!',data);
            })
        });
    }
    }
