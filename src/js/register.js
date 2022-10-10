let mysql = require('mysql');
const ipcRenderer = require('electron').ipcRenderer;


document.getElementById('register').onclick = function(){
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
    }else if(answerData === "两次密码输入不一致"){
        document.getElementById("errPwd").style.display = 'block';
    }
}