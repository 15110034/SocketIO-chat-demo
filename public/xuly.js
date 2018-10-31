var socket = io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
    alert("Sai username,co nguoi da dang ky roi")
});
socket.on("server-send-dki-thangcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});
socket.on("server-send-danhsach-Users",function(data){
   $("#boxContent").html(""); // lam rong trong the nay
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"</div>"); // chen them vao the nay 
    });
});
socket.on("server-send-message",function(data){
    $("#listMessage").append("<div class='ms'>"+data.username+":"+data.message+"</div>");
 });

socket.on("ai-do-dang-go-chu",function(data){
    $("#thongbao").html(data);
});
socket.on("ai-do-stop-go-chu",function(){
    $("#thongbao").html("");
});
$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username",$("#txtUsername").val());
    });
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#chatForm").hide();
        $("#loginForm").show();
        
    });
    $("#btnSendMessage" ).click(function(){
        socket.emit("user-send-message",$("#txtMessage").val());
        
    });
    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });
    $("#txtMessage").focusout(function(){
        socket.emit("toi-stop-go-chu");
    });

});