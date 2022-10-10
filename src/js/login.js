let mysql = require('mysql');
const { read } = require('original-fs');
const fs = require('fs');
const ipcRenderer = require('electron').ipcRenderer;



document.getElementById('login').onclick = function(){
    let number = document.getElementById('phoneNum').value;
    let password = document.getElementById('pwd').value;
    let answer = document.getElementById('answer');
    answer.style.display = "none";
    document.getElementById("ErrPwd").style.display = "none";
    document.getElementById("noUser").style.display = "none";
    let answerData = ipcRenderer.sendSync("login", number, password);
    if(answerData === "登陆成功"){
        answer.style.display = 'block';
        answer.style.backgroundColor = 'white';
        answer.style.color = 'green';
        answer.innerHTML = answerData;
    }else if(answerData === "密码错误"){
        document.getElementById("ErrPwd").style.display = "block";
    }else if(answerData === "用户不存在"){
        document.getElementById("noUser").style.display = "block";
    }else if(answerData === "请输入完整信息"){
        answer.style.display = 'block';
        answer.style.backgroundColor = 'white';
        answer.style.color = 'red';
        answer.innerHTML = answerData;
    }
    if(answerData == '登陆成功'){
        setTimeout(()=>{
            window.location.href = '../html/index.html';
        }, 1000)
    }
}
