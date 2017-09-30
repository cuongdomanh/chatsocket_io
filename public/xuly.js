var socket=io("http://localhost:3000");
socket.on('login-khong-thanh-cong',function(){
	alert('ban dang nhap khong thanh cong xin moi tai khoan khac ');
});
socket.on('login-ok',function(data){
     $('#chatleft').html('');
     $('#login').hide();
	$('#botchat').show();
	$('#chatright').append('<div> xin chao ban : '+data+'</div>');
});
socket.on('hien-thi-ol',function(data){
     $.each(data,function(key,value){
          $('#chatleft').append("<div style='text-align:center'>"+ value+"</div>");
     });
});
socket.on('tra-tin-nhan',function(data){
     $('#chatroom').append("<div>"+data.actor+":"+data.nd+"</div>");
});
socket.on('co-nguoi-dang-nhan',function(data){
	$('#notify').html("<div>"+data+" dang  nhan </div>");
});
$(document).ready(function(){
	$('#login').show();
	$('#botchat').hide();
	$('#btnlogin').click(function(){
	   var data=$('#putlogin').val();
       socket.emit('toi-dang-nhap',data);
	});
	$('#btnmes').click(function(){
       var mes=$('#mes').val();

       socket.emit('gui-tin-nhan',mes);
	});
	$('#mes').click(function(){
        socket.emit('dang-go-chu');
	});
});