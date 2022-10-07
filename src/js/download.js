// 引入fs模块
const fs = require('fs');
const exec = require('child_process').execSync;
var child = require('child_process');

window.onload = function () {
  const btn = document.querySelector("#btn");
  const myData = document.getElementById("res");
  const input = document.getElementById('search_package')
  btn.onclick = function () {
    // 读取data.txt文件


    console.log(input.nodeValue);
    child.exec('yay -Ss '.concat(input.value), function(err, data) {
        // myData.innerHTML = data;
        console.log(data);
        fs.writeFileSync("data/temp", data, (err) => {
          console.log(err);
          // exec("python -u src/backend/search_package.py");
        });
        exec("python -u src/backend/search_package.py");

        // fs.readFile("package.json", (err, data) => {
        //   myData.innerHTML = data;
        // })
        text = ""
        fs.readFile("data/aur_packages.json",(err, data)=> {
          // myData.innerText = data;
          var json = JSON.parse(data)
          // myData.innerText = json[0].from;
        //   for (var i = 0; i < json.length; i++) {
        //     text = text +"<div id = \"package_box\"> "+ 
        //     "<div style=\"float: left;\" id=\"box_text\">" +
        //       "from: " + json[i].from + 
        //     "</div>" + 
        //     "<div style=\"float: right;\" id=\"box_text\">" + 
        //     json[i].software + 
        //     "</div>" + 
        //     "</div>";
        // }
        for (var i = 0; i < json.length; i++) {
          text = text +"<div id = \"package_box\"> "+ 
          "<div style=\"float: left;\" id=\"box_text\">" +
            "from: " + json[i].from + 
          "</div>" + 
          "<button style=\"float: right;\" id=\"download_bottom\" onclick=\"\">Install</button>" +
          "<div style=\"float: right;\" id=\"box_text\">" + 
          json[i].software + 
          "</div>" + 
          "</div>";
      }
        myData.innerHTML = text;
        } )
        // var url = "data/aur_packages.json"
        // var request = new XMLHttpRequest();
        // request.open("get", url);
        // request.send(null);
        // request.onload = function() {
        //   if (request.status == 200) {
        //     var json = JSON.parse(request.responseText);
        //     text = ""
        //     for (var i = 0; i < json.length; i++) {
        //         text = text +"<div id = \"package_box\"> "+ 
        //         "<div style=\"float: left;\" id=\"box_text\">" +
        //           "from: " + json[i].from + 
        //         "</div>" + 
        //         "<div style=\"float: right;\" id=\"box_text\">" + 
        //         json[i].software + 
        //         "</div>" + 
        //         "</div>";
        //     }
        //     myData.innerHTML = text;
        //   }
        // }
    })
  }
}