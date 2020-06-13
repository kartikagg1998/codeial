// it is the file which is used by client side for sending the request for communication(ie me)

class ChatEngine
{
    constructor(chatBoxId,userEmail)
    {
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;//the emailid of the user who initiates the chat

        this.socket=io.connect('http://100.25.168.114:5000');//the request is send for chatting

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

            // send a message on clicking the send-message button to server(chat-socket.ejs)
            $(`#send-message`).click(function()
            {
                let msg=$(`#chat-message-input`).val();//here we ftch the value of msg which is typed in chatbox

                if(msg !='')
                {
                    self.socket.emit('send_message',{  //send_message is event name
                        message:msg,
                        user_email:self.userEmail,
                        chatroom:'codeial'
                    });
                    
                }
           
        });

        self.socket.on('receive_message',function(data)
        {
            console.log('message received',data.message);

            let newMessage=$(`<li>`);
            let messageType='other-message';

            if(data.user_email==self.userEmail)
            {
                messageType='self-message';
            }

            newMessage.append($(`<span>`,
            {
                html:data.message,
                

            }));
             newMessage.append($(`<div>`,
             {
                html:data.user_email,
                
             }));
            newMessage.addClass(messageType);
            $(`#chat-message-list`).append(newMessage);


        })
    }
}

