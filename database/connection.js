const mysql = require("mysql");

let connect = (userName, mobileno) => {
  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hero@1234",
    database: "student_information",
  });

  connection.connect();

  let studentInfo = {
    student_name: userName,
    student_mobileno: mobileno,
  };

  let queryGet = "select student_mobileno from student_tbl";
  let queryPost = "insert into student_tbl set ?";
  let result = false;
  connection.query(queryGet, function (error, resultsInitial) {
    if (error) throw error;
    for(let i=0; i<resultsInitial.length; i++) {
      if(mobileno === (resultsInitial[i].student_mobileno).toString()) {
        result = true;
        break;
      }
    }
    if (result) {
    } else {
      connection.query(queryPost, studentInfo, function (error, results) {
        if (error) throw error;
        console.log("Status ::", results);
      });
      connection.end();
    }
  });
};

exports.connect = connect;
