const http = require("http");
const url = require("url");
const fs = require("fs");
const connection = require("../database/connection");

const port = 3000;

let server = http.createServer(function (request, response) {
  let path = url.parse(request.url).pathname;
  let url_parts = url.parse(request.url, true);
  let query = url_parts.query;
  if(Object.keys(query).length > 0) {
    connection.connect(query.uname, query.mbl);
  }
  switch (path) {
    case "/":
      fs.readFile("./view/pages/index.html", function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write(error);
          response.end();
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
          });
          response.write(data);
          response.end();
        }
      });
      break;
    case "/viewform.css":
      fs.readFile("./view/css" + path, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write(error);
          response.end();
        } else {
          response.writeHead(200, {
            "Content-Type": "text/css",
          });
          response.write(data);
          response.end();
        }
      });
      break;
    case "/viewform.html":
      fs.readFile("./view/pages" + path, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write(error);
          response.end();
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
          });
          response.write(data);
          response.end();
        }
      });
      break;
      case "/statusform.html":
        fs.readFile("./view/pages" + path, function (error, data) {
          if (error) {
            response.writeHead(404);
            response.write(error);
            response.end();
          } else {
            response.writeHead(200, {
              "Content-Type": "text/html",
            });
            response.write(data);
            response.end();
          }
        });
        break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});

server.listen(port, () => {
  console.log("Server listening at port", port);
});
