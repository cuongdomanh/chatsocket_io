var express=require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server= require("http").Server(app);
var io =require("socket.io")(server);
server.listen(3000);
var manguser=["AAAA"];
io.on('connect',function(socket){
	console.log('co nguoi dang ket noi ', socket.id);
	socket.on('toi-dang-nhap',function(data){
	   if(manguser.indexOf(data)>=0){
	   	   socket.emit('login-khong-thanh-cong');
	   }    
	   else{
	    manguser.push(data);
	    socket.user=data;
	   	socket.emit('login-ok',data);
	   	io.sockets.emit('hien-thi-ol',manguser);
	   }
    });
    socket.on('gui-tin-nhan',function(data){
    	io.sockets.emit('tra-tin-nhan',{'actor':socket.user, 'nd':data});
    });
    socket.on('dang-go-chu',function(){
        io.sockets.emit('co-nguoi-dang-nhan',socket.user);
    });
});

app.get("/",function(rep,res){
	res.render("trangchu");
})