const fs = require('fs');
const path = require('path')
const ipcRenderer = require('electron').ipcRenderer;

document.getElementById("signOut").onclick = ()=>{
    fs.writeFile(path.join(__dirname ,"../../config/user.json"), "", function(err){
        if(err){
            console.log('用户信息写入文件失败');
            console.log(err.message);
        }
    })
    window.location.href = '../html/login.html';
}

var webview =
onload = () => {
    webview = document.querySelector('webview')
    fs.readFile(path.join(__dirname ,"../../config/user.json"), (err, data)=>{
        if(err){
            console.log(err.message);
        }else{
            if(data.byteLength > 0){
                let json = JSON.parse(data);
                let url = "../../config/" + json.phone + '.png';
                try{
                    if(fs.existsSync(path.join(__dirname, url))){
                        document.getElementById("useicon").src = url;
                    }
                }catch(err){
                    console.log(err);
                }
            }
        }
    })
}
function goBackWebView(){
    window.location.replace("./index.html");
}
function goForwardWebView(){
    webview.goForward()
}


document.getElementById("useicon").onclick = ()=>{
    let answerData = ipcRenderer.sendSync("chooseAvatar");
    if(answerData){
        document.getElementById("useicon").src = answerData;
        fs.readFile(path.join(__dirname, "../../config/user.json"), (err, data)=>{
            console.log(answerData);
        if(err){
            console.log(err.message);
        }else{
            if(data){
                var json = JSON.parse(data);
                fs.readFile(answerData[0], (err, dataImg)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                        let url = "../../config/" + json.phone + '.png';
                        fs.writeFile(path.join(__dirname, url), dataImg, (err)=>{
                            if(err){
                                console.log(err.message);
                            }
                        })
                    }
                })
            }
        }
    })
    }
}
