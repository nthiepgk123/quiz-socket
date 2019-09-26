 
var socket  = io("https://nguyenhiep.herokuapp.com");
var user="";
socket.on("server-dangkithatbai",function(){
    alert("dang ki that bai")
});

socket.on("server-dangkithanhcong",function(){
    $("#loginForm").hide();
    $("#starForm").show();
    $("#playForm").hide();
})
 
 
 $(document).ready(function(){
    $("#loginForm").show();
    $("#starForm").hide();
    $("#playForm").hide();
    
    $("#btnRegister").click(function(){
        user = $("#txtname").val();
        socket.emit("client-sent-Register",$("#txtname").val());
        document.getElementById("TenNguoiChoi").innerHTML = "Name: " + user;
    });

    $("#btnStar").click(function(){
        $("#loginForm").hide();
        $("#starForm").hide();
        $("#playForm").show();
        var fiveMinutes =15*60;
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    })
    function show(){
   
        if(god.Ketthuc()){
            showDiem();
            /* hien thi diem */
            showKetqua();   
        }
        else{
            /* hien cau hoi ra man hinh */
            var lamcauhoi = document.getElementById("cauhoi");
            lamcauhoi.innerHTML = god.Laycauhoiso().text;
           
            /* Hien su lua chon ra man hinh */
            var luachondapan = god.Laycauhoiso().luachon;
            // var soluachon = document.getElementById("dapan1");
            //     soluachon.innerHTML = luachondapan[0];
            
            for(var i = 0 ; i < luachondapan.length ; i++ )
            {
                // console.log(luachondapan[0]);
                // console.log(luachondapan[1]);
                // console.log(luachondapan[2]);
                // console.log(luachondapan[3]);
                // console.log(luachondapan.length);   
                var soluachon = document.getElementById("dapan" + i);
                soluachon.innerHTML = luachondapan[i];
                DuDoanDapAn("D" + i,luachondapan[i]);
            }
            /* show diem dat duoc */  
            showDiem();
        }
        
    };
    
    function showDiem(){
        var temp = god.Diem;
        var conso = god.cauhoiso;
        var elemen = document.getElementById("DiemHienTai");
        elemen.innerHTML = "SCORE :" + temp;
        // gui diem ve cho server
        socket.emit("sent-score",{
                u:user,
                scr:temp,
                nb:conso,
            }
        );
    } 
    
    function DuDoanDapAn(id , dapan){
        var button = document.getElementById(id);
        button.onclick = function(){
            god.DuDoan(dapan);
            show();
        }
    }
    
    function showKetqua(){
        var ketquathtml = '<div class="text-center"><img src="finish.png" alt="con ga" width="150px">';
        ketquathtml += "<p>Name : "+ user +"</p>";
        ketquathtml += "<p>Scores :" + god.Diem + "</p>";
        ketquathtml += "<p>Congratulation , You have completed the test !</p>";
        ketquathtml += '<img src="chicken.png" alt="con ga" width="200px">';
        //ketquathtml += '<button onclick="playagain()">' + 'click' + '</button>';
        //ketquathtml += '<a href="#/"><input type="button" value="đã xong phần thi" class="buttonagain"></a></div>';
        var showKetquahtml = document.getElementById("playForm");
        showKetquahtml.innerHTML = ketquathtml;
    }
    
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                showKetqua();
                return;
            }
        }, 1000);
    }

    var questions = [
        /**01 - 10 */
        new Cauhoi(" Túi thần kì của Doremon có màu gì?",["Trắng","Xanh","Vàng","Đỏ"],"Trắng"),
        new Cauhoi("Quang Dũng viết bài thơ Tây Tiến bằng bút pháp:",["hiện thực","lãng mạng","trào lộng","châm biếm, mỉa mai"],"lãng mạng"),
        new Cauhoi("Một hũ mật ong đầy nặng 1000g, một nửa hũ mật ong nặng 600g, vậy hũ mật ong rỗng nặng bao nhiêu?",["200g","400g","600g","100g"],"200g"),
        new Cauhoi("Giấy quỳ tím tác dụng với axit ra màu xanh hay màu tím?",["Xanh","Đỏ","Tím","Vàng"],"Đỏ"),
        new Cauhoi("Tây đô là tên gọi cũ của thành phố nào ở nước ta?",["Đà Nẵng","Cần Thơ","Hà Nội","Hải Phòng"],"Cần Thơ"),
        new Cauhoi("Phương tiện nào được sử dụng trong bài hát '12 giờ'?",["Xe Máy","Máy Bay","Ô Tô","Xe Đạp"],"Xe Đạp"),
        new Cauhoi("Trong món trà tranh mật ong thì cái gì quan trọng nhất?",["Trà","Mật Ong","Chanh","Không cái nào"],"Trà"),
        new Cauhoi("Đạo hàm của (u * v)' là gì ?",["uv + u'v'","uv' + uv'","(uv) + (uv)'","u'v + uv'"],"u'v + uv'"),
        new Cauhoi("If you _____ money to mine, we shall have enough",["add","combine","unite","bank"],"add"),
        new Cauhoi("'Sóng tìm ra tận bể - Ôi con sóng nhớ bờ.',Xuân Quỳnh vận dụng biện pháp tu từ:",["ẩn dụ","hoán dụ","nhân hóa","so sánh"],"ẩn dụ"),
        /**11 - 20 */
        new Cauhoi("Polietilen được điều chế từ etilen bằng phản ứng",["trùng ngưng","trùng hợp","oxi hoá - khử","trao đổi"],"trùng hợp"),
        new Cauhoi("Số electron tối đa có thể chứa trong lớp p: ?",["2","4","6","12"],"6"),
        new Cauhoi("EURO lần đầu tiên tổ chức tại quốc gia nào? ",["Pháp","Đức","Nga","Brazil"],"Pháp"),
        new Cauhoi("Ếch hô hấp bằng .... và bằng ......",["Da","Miệng","Phổi","Da và Phổi"],"Da và Phổi"),
        new Cauhoi("Có bao nhiêu loại hàng hóa đã được phú ông đem ra gạ đổi chiếc quạt mo của thằng Bờm? ",["4","5","6","7"],"6"),
        new Cauhoi("Ca sĩ nào đã hát bài Bonjour Việt Nam đầu tiên?",["Phạm Quỳnh Anh","Sơn Tùng","Mỹ Tâm","Hoài Linh"],"Phạm Quỳnh Anh"),
        new Cauhoi("Trên bàn phím máy tính có bao nhiêu phím chức năng bắt đầu bằng chữ F? ",["11","12","13","14"],"12"),
        new Cauhoi("VNUHCM-US là tên viết tắt của trường nào ?",["ĐH Sư Phạm","ĐH Hành Chính","KHTN","Hồng Bàng"],"KHTN"),
        new Cauhoi("Một inch bằng bao nhiêu cm?",["2.54","2.55","2.56","2.57"],"2.54"),
        new Cauhoi("Trong một bảng đấu gồm 5 đội bóng sẽ có bao nhiêu trận đấu cả thảy? ",["8","10","12","14"],"10"),
        /**21 - 30 */
        new Cauhoi("Tốc độ truyền âm phụ thuộc vào:",["cường độ âm","độ to của âm","môi trường truyền","âm sắc"],"môi trường truyền"),
        new Cauhoi("Vitamin nào trong số các vitamin A, B1 , B12 , C tan được trong dầu mỡ? ",["A","B1","B12","C"],"A"),
        new Cauhoi("Trong 1 năm dương lịch, có bao nhiêu tháng có 30 ngày? ",["3","4","5","6"],"4"),
        new Cauhoi("Quốc hiệu nước ta vào thời Lê Lợi lên ngôi là gì? ",["Văn Lang","Hồ Chí Minh","Lạc Việt","Đại Việt"],"Đại Việt"),
        new Cauhoi("Việt Nam đã được UNESCO công nhận bao nhiêu di sản của thế giới?",["4","5","6","7"],"7"),
        new Cauhoi("Khi hoà tan amoni nitrat vào nước, nhiệt độ dung dịch sẽ thay đổi như thế nào? ",["Tăng","Giảm","Không Hiện Tượng","Null"],"Giảm"),
        new Cauhoi("Từ 1 đến 150 có bao nhiêu chữ số 0 ? ",["14","15","16","17"],"16"),
        new Cauhoi("Khi rơi tự do vật bị lêch về phương nào ?",["Đông","Tây","Nam","Bắc"],"Đông"),
        new Cauhoi("Tỉnh nào của nước ta có diện tích lớn nhất ?",["Đồng Nai","Hải Phòng","Nghệ An","Phú Yên"],"Nghệ An"),
        new Cauhoi("Loại phân bón nào có hàm lượng đạm lớn nhất ?",["P","NPK","(NH2)2CO","BaCl2"],"(NH2)2CO"),
        /**31-35 */
        new Cauhoi("Thiết bị nào sau đây dùng để kết nối mạng?",["Ram","Rom","Router","CPU"],"Router"),
        new Cauhoi("Động vật đơn bào hay đa bào có tổ chức thấp (ruột khoang, giun tròn, giun dẹp) hô hấp",["bằng mang","bằng phổi","bằng hệ thống ống khí","qua bề mặt cơ thể"],"qua bề mặt cơ thể"),
        new Cauhoi("(1) tôm (2) cua (3) châu chấu (4) trai (5) giun đất (6) ốc.Những loài nào hô hấp bằng mang ?",["(1),(2),(3)và(5)","(4)và(5)","(1),(2),(4)và(6)","(3),(4),(5)và(6)"],"(1),(2),(4)và(6)"),
        new Cauhoi("Phần lớn Đông Nam Á lục địa có khí hậu",["Xích đạo","Cận nhiệt đới","Ôn đới","Nhiệt đới gió mùa"],"Nhiệt đới gió mùa"),
        new Cauhoi("Một trong những lợi thế của hầu hết các nước Đông Nam Á là",["thủy điện","lâm nghiệp","kinh tế biển","chăn nuôi"],"kinh tế biển"),
        
        new Cauhoi("Trong bảng tính Excel, giá trị trả về của công thức=LEN(“TRUNG TAM TIN HOC”) là:",["15","16","17","18"],"17"),
        new Cauhoi("Sóng điện từ có tần số f = 300 MHz thuộc loại",["sóng dài","sóng trung","sóng ngắn","sóng cực ngắn"],"sóng cực ngắn"),
        new Cauhoi("Nếu 8 năm trước Mario 32 tuổi thì anh ta bao nhiêu tuổi cách đây x năm?",["x - 40","x - 24","40 - x","24 - x"],"40 - x"),
        new Cauhoi("4; 12; 8; 24; 16; (…) số còn thiếu trong dãy số sau.",["42","44","46","48"],"48"),
        new Cauhoi("Để vẽ đồ thị trong Slide ta chọn:",["File/ Chart","Insert/ Chart","View/ Chart","Design/ Chart"],"Insert/ Chart"),
        
        /**------- */
        //new Cauhoi("",["","","",""],""),
        //new Cauhoi("",["","","",""],""),
    ];

        var god = new God(questions);
        show();
    
});

