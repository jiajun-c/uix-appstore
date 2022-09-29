let mysql = require('mysql');
const { read } = require('original-fs');



document.getElementById('login').onclick = function(){
    let number = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    let answer = document.getElementById('answer');
    let connection = mysql.createConnection({
        host: '124.222.235.230',
        user: 'root',
        password: 'risc-v',
        database: 'app_user'
    });
    connection.connect();
    let sql = "select passwd from user where phone='" + number + "';";
    connection.query(sql, function(err, result){
        if(!err){
            if(result[0]){
                if(password == result[0]['passwd']){
                    answer.innerHTML = "登陆成功";
                    setTimeout(()=>{
                        window.location.href='./index.html';
                    }, 2000);
                    return;
                }else{
                    answer.innerHTML = "密码错误";
                    return;
                }
            }else{
                answer.innerHTML = "用户不存在";
                return;
            }
        }else{
            console.log(err.message);
            alert("读取数据库失败");
            return;
        }
    })
}