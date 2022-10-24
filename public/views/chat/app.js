fetch("../public/views/chat/chat.hbs")
    .then((response) => {
        return response.text()
    })
    .then((template) => {
        const chatContainer = document.querySelector("#chat-container");
        const emailForm = document.querySelector('#emailForm')
        const submitMessageBtn = document.querySelector('#submitMessageBtn')
        const messageForm = document.querySelector('#message-form')



        const chatTemplate = Handlebars.compile(template);
        const socket = io();


        const updateChatView = (chats) => {
            const html = chatTemplate({
                chats
            });
            chatContainer.innerHTML = html;
            chatContainer.scrollTop = chatContainer.scrollHeight
        }

        const setEmails = (emails) => {
            emails.forEach(email => {
                const option = document.createElement('option')
                option.setAttribute('value', email)
                option.innerHTML = email
                emailForm.appendChild(option)
            });
        }

        socket.on("init", (chats) => {
            const emails = chats.map(chat => chat.email)
            const uniqueEmails = [...new Set(emails)]
            setEmails(uniqueEmails)
            emailForm.addEventListener('change', (event) => {
                const filteredChats = chats.filter(chat => chat.email === event.target.value)
                updateChatView(filteredChats)
            })
        });

        socket.on('update', (chats) => {
            const filteredChats = chats.filter(chat => chat.email === emailForm.value)
            updateChatView(filteredChats)
            emailForm.addEventListener('change', (event) => {
                const filteredChats = chats.filter(chat => chat.email === event.target.value)
                updateChatView(filteredChats)
            })
        })

        submitMessageBtn.addEventListener('click', (event) => {
            event.preventDefault()
            const newChat = {email: emailForm.value, type: "system", message: messageForm.value}
            if(newChat.email === 'false' || !newChat.message){
            
            }
            else {
                socket.emit('new_message', newChat)
                messageForm.value = ""
            }
        })
    });