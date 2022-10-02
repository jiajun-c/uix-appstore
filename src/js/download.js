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
        fs.writeFile("data/temp", data, (err) => {
          console.log(err);
          exec("python -u src/backend/search_package.py");
        });
        // fs.readFile("package.json", (err, data) => {
        //   myData.innerHTML = data;
        // })
        fs.readFile("data/aur_packages.json",(err, data)=> {
          myData.innerText = data;
        } )
    })
  }
}