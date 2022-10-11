let mysql = require('mysql');

var url = require('url')
const fs = require('fs');
const path = require('path');
const ipcRenderer = require('electron').ipcRenderer;


document.getElementById('register').onclick = function(){
    // console.log(document.getElementById("avatar").src)
    let avatarUrl = new String(document.getElementById("avatar").src);
    let lastIndex = avatarUrl.lastIndexOf('/');
    let urlName = avatarUrl.substring(lastIndex + 1);
    document.getElementById('answer').style.display = 'none';
    document.getElementById("repeatUser").style.display = 'none';
    document.getElementById("repeatName").style.display = 'none';
    document.getElementById("errPwd").style.display = 'none';
    let phone = document.getElementById('phoneNum').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('pwd').value;
    let passwordAgain = document.getElementById('pwdAgain').value;
    let answer = document.getElementById('answer');
    let answerData = ipcRenderer.sendSync("register", phone, username, password, passwordAgain);
    if(answerData === "请输入完整信息"){
        answer.style.display = 'block';
        answer.style.color = 'red';
        answer.innerHTML = answerData;
    }else if(answerData === "用户已经存在"){
        document.getElementById("repeatUser").style.display = 'block';
    }else if(answerData === "用户名重复"){
        document.getElementById("repeatName").style.display = 'block';
    }else if(answerData === "注册成功"){
        answer.style.display = 'block';
        answer.style.color = 'green';
        answer.innerHTML = answerData;
        if(urlName != "login.jpg"){
            console.log(avatarUrl);
            let index = avatarUrl.indexOf('/');
            console.log(index);
            let sub = avatarUrl.substring(index + 3);
            // let sub2 = sub.replace("/", "/");
            console.log(sub);
            fs.readFile(new URL(sub), function(err, data){
                if(err){
                    console.log(err.message);
                }else{
                    let tempUrl = "../../config/" + phone + '.png';
                    fs.writeFile(path.join(__dirname, tempUrl), data, function(err){
                        if(err){
                            console.log(err.message);
                        }
                    })
                    let userData = {'phone': phone, 'password': password};
                    const userStr = JSON.stringify(userData);
                    console.log(userStr);
                    fs.writeFile(path.join(__dirname, "../../config/user.json"), userStr, function(err){
                        if(err){
                            console.log('用户信息写入文件失败');
                            console.log(err.message);
                        }
                    })
                }
            })
        }
    }else if(answerData === "两次密码输入不一致"){
        document.getElementById("errPwd").style.display = 'block';
    }
}

document.getElementById("avatar").onclick = function(){
    let answerData = ipcRenderer.sendSync("chooseAvatar");
    if(answerData){
        document.getElementById("avatar").src = answerData;
    }
}