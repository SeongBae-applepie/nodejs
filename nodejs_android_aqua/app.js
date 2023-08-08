//hi
var app = require("express")();
const mysql = require("mysql2");
const dbconfig = require("./config/db_config.js");
const { json } = require("express");
const conn = mysql.createConnection(dbconfig);
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var port = 3000;

io.on("connection", function (socket) {
  //클라이언트 연결되면
  console.log(socket.id, "Connected"); //연결됨을 콘솔에 출력

  var id_message = {
    id: `${socket.id} 나의 아이디`,
  };

  //클라이언트에게 값 전달 (amdroid 에서는 log로 띄워짐)
  socket.emit("check_con", id_message);

  const result_str = Object();

  //클라이언트에게 msg가 emit되면 실행
  socket.on("msg", function (data) {
    conn.connect();
    var sql =
      // "SELECT json_object('id',e.id,'hum',e.hum,'temp',e.temp,'light',e.light,'wtemp',e.wtemp) from env e; ";
      "select * from env";
    conn.query(sql, function (err, rows, fields) {
      if (err) {
        console.error("error connecting: " + err.stack);
      }

      result_str = rows;
      console.log("rows :", result_str);

      //const sp_str = rows.split(":");
    });

    conn.end();

    //클라이언트에게 메세지 전송
    socket.emit("msg_to_client", result_str); //클라이언트로 메시지 전송
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
