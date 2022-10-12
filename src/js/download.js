// 引入fs模块
const fs = require('fs');
const exec = require('child_process').execSync;
var child = require('child_process');

window.onload = function () {
  const btn = document.querySelector("#btn");
  const myData = document.getElementById("res");
  const ret = document.getElementById('ret')
  const input = document.getElementById('search_package')
  input.onclick =function() {
    window.location.replace("./index.html")
  };
  btn.onclick = function () {
    // 读取data.txt文件
    console.log(input.nodeValue);
    child.exec('yay -Ss '.concat(input.value), function(err, data) {
        // myData.innerHTML = data;
        console.log(data);
        fs.writeFileSync("data/temp", data, (err) => {
          console.log(err);
        });
        exec("python -u src/backend/search_package.py");
        text = ""
        fs.readFile("data/aur_packages.json",(err, data)=> {
          // myData.innerText = data;
          var json = JSON.parse(data)
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
    })
  }
}

function goBackWebView(){
  window.location.replace("./index.html");
}


function download(name) {
  
}