var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var path = require('path');

//设置模板为html
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


//静态目录
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/',function(req, res){
	res.render('chatroom',{title:'聊天室'});

})

app.post('/uname',function(req,res){
	// console.log(res);
	res.send(res.query);
	// 
	// res.sendFile(__dirname+'/nicheng.php');

})
var num = 0;
//监听客户端链接,回调函数会传递本次链接的socket
io.on('connection', function (socket) {
	
	num++;
	//发送消息到客户端
  	// socket.emit('news', { hello: 'world' });


	//监听客户端发送的昵称
	//
	//
	
  	socket.on('uname', function (data) {
    	
		// console.log(data);
		
		socket.uname = data;
		io.emit('num',num);
  	});

 	//监听客户端发送的消息

  	socket.on('message', function (data) {
    
		socket.message = data;

		//向客户端发送昵称消息以及时间
		io.emit('msg',{uname:socket.uname,message:socket.message,time:new Date()});

  	});

  	socket.on('disconnect',function(data){
  		num--;
  		io.emit('num',num);
  	})

  	
});



server.listen(3000);
console.log('端口号是3000');