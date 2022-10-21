fetch("./chat.hbs")
    .then((response) => response.text())
    .then((template) => {
        const chatContainer = document.querySelector("#chat-container");
        const template = Handlebars.compile(template);
        const socket = io();

        socket.on('init', chats => {
            const html = template({ chats })
            chatContainer.innerHTML = html
        })
    });