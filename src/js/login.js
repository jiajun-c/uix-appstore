let mysql = require('mysql');
const { read } = require('original-fs');
const path = require('path');
const fs = require('fs');
const ipcRenderer = require('electron').ipcRenderer;

var userData;

onload = ()=>{
    fs.readFile(path.join(__dirname, "../../../config/user.json"), (err, data)=>{
        if(err){
            console.log(err.message);
        }else{
            if(data.byteLength > 0){
                console.log(new Boolean(data));
                console.log(data);
                let json = JSON.parse(data);
                document.getElementById("phoneNum").value = json.phone;
                document.getElementById("pwd").value = json.password;
                console.log(json);
                let url = '../../../config/' + json.phone + '.png';
                try{
                    if(fs.existsSync(path.join(__dirname, url))){
                        document.getElementById("avatar").src = url;
                    }
                }catch(err){
                    console.log(err);
                }
            }else{
                console.log("没有数据")
            }
        }
    })
}

document.getElementById("phoneNum").oninput = ()=>{
    let phone = document.getElementById("phoneNum").value;
    try{
        let url = '../../../config/' + phone + '.png';
        if(fs.existsSync(path.join(__dirname, url))){
            document.getElementById("avatar").src = url;
        }
    }catch(err){
        console.log(err);
    }
}

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
        let tempUrl = "../../../config/" + number + ".png";
        fs.readFile(path.join(__dirname, tempUrl), (err, data)=>{
            if(err){
                console.log(err.message);
            }else{
                fs.writeFile(path.join(__dirname, "../../img/arv.png"), data, (err)=>{
                    if(err){
                        console.log(err.message);
                    }
                })
            }
        })
        setTimeout(()=>{
            window.location.href = '../index.html';
        }, 500)
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
}
