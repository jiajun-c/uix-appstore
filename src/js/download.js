// 引入fs模块
const fs = require('fs');
const exec = require('child_process').execSync;
var child = require('child_process');
let arr = document.getElementsByTagName('button');

window.onload = function () {
  const myData = document.getElementById("res");
  const ret = document.getElementById('ret');
  const input = document.getElementById('search_package');
  const btn = document.querySelector("#btn");
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
      let f = function() {
        var exe = "sudo -S yay -S " + this.value + " < data/input";
        console.log(exe);
        child.exec(exe);
        this.textContent = "installed";
      }
      exec("python -u src/backend/search_package.py");
      fs.readFile("data/aur_packages.json",(err, data)=> {
        // myData.innerText = data;
        while(myData.hasChildNodes()) {
          myData.removeChild(myData.firstChild);
        }
        var json = JSON.parse(data);
        for (var i = 0; i < json.length; i++) {
          let node = document.createElement('div');
          node.id = "package_box"

          let from = document.createElement('div');
          from.style = "float: left";
          from.id = "box_text";
          from.textContent = json[i].from;

          let button = document.createElement('button');
          button.style = "float: right";
          button.id = "download_bottom";
          button.value = json[i].software;
          // To do 
          button.onclick = f;
          // 后面还需要判断是否已经安装
          button.textContent = "Install";

          let software = document.createElement('div');
          software.id = "box_text";
          software.style = "float: right";
          software.textContent = json[i].software;
          // software.onclick = f(json[i].software);
          
          node.appendChild(from);
          node.appendChild(button);
          node.appendChild(software);
          myData.appendChild(node);
        }
      } )
  })
  }
}