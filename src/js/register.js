let mysql = require('mysql');


document.getElementById('register').onclick = function(){
    let phone = document.getElementById('uid').value;
    let username = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    let passwordAgain = document.getElementById('passwordAgain').value;
    let answer = document.getElementById('answer');
    if(!password || !passwordAgain || !phone || !username){
        answer.innerHTML = "请输入完整信息";
        return;
    }
    if(password != passwordAgain){
        answer.innerHTML = "两次密码输入不一致";
        return;
    }


    let connection = mysql.createConnection({
        host: '124.222.235.230',
        user: 'root',
        password: 'risc-v',
        database: 'app_user'
    });
    connection.connect();
    let sql = "select passwd from user where phone='" + phone + "';";

    connection.query(sql, function(err, result){
        if(!err){
            if(result[0]){
                answer.innerHTML = "用户已经存在";
                return;
            }else{
                let sql = "insert into user(username, passwd, phone) values('" + username + "','" + password +"','" + phone + "');";
                connection.query(sql, function(err){
                    if(err){
                        console.log(err.message);
                        answer.innerHTML = "注册失败";
                        return;
                    }else{
                        answer.innerHTML = "注册成功";
                        setTimeout(()=>{
                            window.location.href = './login.html';
                        }, 2000);
                        return;
                    }
                })
            }
        }else{
            console.log(err.message);
            return alert('读取数据库失败');
        }
    })
}