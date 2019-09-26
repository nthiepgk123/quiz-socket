var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);
// lắng nghe có người kết nối
var ListSinhVien = [];

io.on("connection",function(socket){
    console.log("co nguoi ket noi:" + socket.id);
    
  
    socket.on("client-sent-Register",function(data){
        var pos = ListSinhVien.map(function(e) { return e.USER; }).indexOf(data);
        if(pos >= 0 || data == ""){
            socket.emit("server-dangkithatbai");
        }

        else{
            socket.emit("server-dangkithanhcong",);
            ListSinhVien.push(new SinhVien(data,0));
            socket.UserName = data;
        }
        
        io.sockets.emit("server-quanlydanhsach",ListSinhVien);
        //console.log(socket.id + "Vua gui :" + data.Username + "  " + data.phone);
        //io.sockets.emit("server-sent-listuser",data);
        //socket.broadcast.emit(data);
        //socket.emit("b","hahah");
    });

    // client gui diem cho server quan ly
    socket.on("sent-score",function(data){
        //console.log(data);
        for(var i = 0;i < ListSinhVien.length;i++){
            if(ListSinhVien[i].USER == data.u){
                ListSinhVien[i].DIEM = data.scr;
                ListSinhVien[i].NUMBER = data.nb;
                console.log(ListSinhVien[i]);
                break;
            }
        }
        ListSinhVien.sort(function (a, b) {
            return b.DIEM - a.DIEM;
          });
        io.sockets.emit("server-quanlydanhsach",ListSinhVien);
    });

    socket.on("disconnect",function(){
        
        // Xoá người chơi khi disconnect
        for(var i = 0 ; i < ListSinhVien.length;i++){
            if(ListSinhVien[i].USER == socket.UserName){
                ListSinhVien.splice(i,1);
                break;
            }
        }
        io.sockets.emit("server-quanlydanhsach",ListSinhVien);
    })
});
function SinhVien(user,diem,numBer){
    this.USER = user;
    this.DIEM = diem;
    this.NUMBER = numBer;
}
app.get("/",function(req, res){
    res.render("client");
});

app.get("/quanly/",function(req,res){
    res.render("dsxephang")
});