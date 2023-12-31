var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var port = 3000;

io.on("connection", function (socket) {
  //클라이언트 연결되면
  console.log(socket.id, "Connected"); //연결됨을 콘솔에 출력
  var id_message = {
    id: `${socket.id} 나의 아이디`,
  };
  socket.emit("check_con", id_message);

  socket.on("msg", function (data) {
    //클라이언트에게 msg가 emit되면 실행
    console.log(socket.id, data);

    console.log("-------------------");
    console.log("id: ", data.id);
    console.log("password: ", data.password);
    console.log("-------------------");
    var message = {
      msg: `Server : "${data.id}" 당신의 id.`,
      msg2: "어떠세요?",
      msg3: "어떠세요!!!33",
    };
    socket.emit("msg_to_client", message); //클라이언트로 메시지 전송
  });
  socket.on("disconnect", function () {
    //클라이언트 연결 끊어지면 자동 실행
    console.log("disconnected");
  });
});

http.listen(port, () => {
  //클라이언트 대기
  console.log("listening on *:" + port);
});
