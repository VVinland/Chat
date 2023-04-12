const formChat = document.getElementById('formChat');
const input = document.getElementById('input');
const message = document.getElementById('messages');
const socket = io();

const formUserName = document.getElementById('formUserName');
const userName = document.getElementById('userName');

formUserName.addEventListener('submit', function (event) {
    event.preventDefault();

    if (userName.value) {
        formUserName.style.display = 'none';
        formChat.style.display = 'flex';
    }
})

formChat.addEventListener('submit', function (event) {
    event.preventDefault();

    if (input.value) {
        socket.emit('chat message', { name: userName.value, body: input.value });
        input.value = '';
    }
})

socket.on('chat message', function (data) {
    const itemHours = new Date().getHours();
    const itemMinutes = new Date().getMinutes();

    message.insertAdjacentHTML(
        'beforeend',
        `<div class='mess'>
        <div class='sizeNameAndDate'>${data.name} <label>${itemHours}:${itemMinutes}</label>
        </div>
        <li>${data.body}</li>
        </div>`
    )
    setTimeout(function(){
        message.scrollTop = message.scrollHeight;
    },0)
})


