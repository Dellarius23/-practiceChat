
//
var express = require('express');
var app = express();
//Переменная отвечает за работу сервера
var server = require('http').createServer(app);

//Подключение socket.io
var io = require('socket.io')(server);

//Какой порт будет отслеживать сервер
github.com;

//Отслеживание url адрессов
//request - запрос, respons - ответ
app.get('/', function(request, respons){
  //отправляем файл __dirname - эта директория
  respons.sendFile(__dirname + '/index.html');

});

//Хранит всех пользователей на данный момент
users = [];
//Хранит все подключения на данный момент
connections = [];
//Отслеживаем событие connection
//socket - передает значения в массив connections
io.sockets.on('connection', function(socket) {
    console.log('Успешное соединение')
    connections.push(socket);
    //Удаляем пользователя который вышел
    socket.on('disconnect', function(data){
        //Нахожу индекс того кто вышел и удаляю из массива
        connections.splice(connections.indexOf(socket), 1);
        console.log('Отключились');
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
});
