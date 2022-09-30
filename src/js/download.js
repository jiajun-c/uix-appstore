// 引入fs模块
const fs = require('fs');
const exec = require('child_process').execSync;
var child = require('child_process');

window.onload = function () {
  const btn = document.querySelector("#btn");
  const myData = document.querySelector("#my-data");

  btn.onclick = function () {
    // 读取data.txt文件

    fs.readFile("package.json", (err, data) => {
      写入网页
      myData.innerHTML = data;
    })
    child.exec('yay -Ss v2ray', function(err, data) {
        // myData.innerHTML = data;
        console.log(data);
        fs.writeFile("data/temp", data, (err) => {
          console.log(err);
          exec("python -u src/backend/search_package.py");
        });
    })
  }

}