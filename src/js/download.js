// 引入fs模块
const fs = require('fs');
const exec = require('child_process').execSync;
var child = require('child_process');
let arr = document.getElementsByTagName('button');

// window.onload = function () {
//   const myData = document.getElementById("res");
//   const ret = document.getElementById('ret')
//   const input = document.getElementById('search_package')
//   // input.onclick =function() {
//   //   window.location.replace("./index.html")
//   // };
// }
const btn = document.querySelector("#btn");
const myData = document.getElementById("res");
btn.onclick = function () {
  // 读取data.txt文件
  const input = document.getElementById('search_package')
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
        "<button style=\"float: right;\" id=\"download_bottom\">Install</button>" +
        "<div style=\"float: right;\" id=\"box_text\">" + 
        json[i].software + 
        "</div>" + 
        "</div>";
    }
      myData.innerHTML = text;
      } )
  })
  arr = document.getElementsByTagName('button');
  for (var i = 1; i < arr.length; i++) {
    arr[i].addEventListener('click', function () {
      console.log("dedede");
      child.exec("touch ~/dede");
    })
}
}
// for (var i = 1; i < arr.length; i++) {
//     arr[i].onclick = function click() {
//       console.log('Button clicked');
//         ans = "touch ~/" + this.id;
//         child.exec(ans);
//       }
// }
function goBackWebView(){
  window.location.replace("./index.html");
}


function download(name) {
  
}