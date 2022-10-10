const fs = require('fs');
const path = require('path')

document.getElementById("signOut").onclick = ()=>{
    fs.writeFile(path.join(__dirname ,"../../config/user.json"), "", function(err){
        if(err){
            console.log('用户信息写入文件失败');
            console.log(err.message);
        }
    })
    window.location.href = '../html/login.html';
}