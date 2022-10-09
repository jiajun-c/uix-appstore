let mysql = require('mysql');
const { read } = require('original-fs');
const fs = require('fs');
const ipcRenderer = require('electron').ipcRenderer;



document.getElementById('login').onclick = function(){
    let number = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    let answer = document.getElementById('answer');
    let answerData = ipcRenderer.sendSync("login", number, password);
    answer.style.color = 'red';
    answer.style.display = 'block';
    answer.style.backgroundColor = 'white';
    if(answerData == '登陆成功'){
        answer.style.color = 'green';
    }
    answer.innerHTML = answerData;
    if(answerData == '登陆成功'){
        setTimeout(()=>{
            window.location.href = '../html/index.html';
        }, 1000)
    }
}
