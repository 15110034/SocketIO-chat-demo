var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000,function(){
    console.log("app is listening on port 3000");
})
var mangUsers=["AAA"];
io.on("connection",function(socket){
    console.log("co nguoi vua ket noi:"+socket.id);
    socket.on("client-send-Username",function(data){
       if(mangUsers.indexOf(data)>=0){
           //fail 
           socket.emit("server-send-dki-thatbai");
       }else{
           //success    
           mangUsers.push(data);
           socket.Username = data ; // tự tạo biến Username cho socket 
           socket.emit("server-send-dki-thangcong",data);
           io.sockets.emit("server-send-danhsach-Users",mangUsers);
       }
    });
    socket.on("logout",function(){ // khi logout phai xoa then do ra khoi mang do 
        mangUsers.splice(
            mangUsers.indexOf(socket.Username),1
        );
        socket.broadcast.emit("server-send-danhsach-Users",mangUsers);

    });
    socket.on("user-send-message",function(data){
        console.log(socket.Username+"send message: "+data);
        io.sockets.emit("server-send-message",{username:socket.Username,message:data}); // gui ve client json 
    });
    socket.on("toi-dang-go-chu",function(){
       // console.log(socket.Username+"dang go chu");
       var s= socket.Username+ "đang gõ chữ...";
       console.log(s);
      socket.broadcast.emit("ai-do-dang-go-chu",s);

    });
    socket.on("toi-stop-go-chu",function(){
        console.log(socket.Username+":stop go chu");
        socket.broadcast.emit("ai-do-stop-go-chu");
    });
});
app.get("/",function(req,res){
res.render("trangchu");
});