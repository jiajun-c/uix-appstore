// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('fs');
const mysql = require('mysql');
const ipcMain = require('electron').ipcMain;
const { dialog } = require('electron')

var myWindow_base = null;

ipcMain.on('login', function(event, user, password){
    if(!user || !password){
        event.returnValue = '请输入完整信息';
        return;
    }
    let connection = mysql.createConnection({
        host: '124.222.235.230',
        user: 'root',
        password: 'risc-v',
        database: 'app_user'
    });
    connection.connect();
    let sql = "select passwd from user where phone='" + user + "';";
    connection.query(sql, function(err, result){
        if(!err){
            if(result[0]){
                if(password == result[0]['passwd']){
                    let userData = {'phone': user, 'password': password};
                    const userStr = JSON.stringify(userData);
                    console.log(userStr);
                    fs.writeFile('config/user.json', userStr, function(err){
                        if(err){
                            console.log('用户信息写入文件失败');
                            console.log(err.message);
                        }
                    })
                    event.returnValue = '登陆成功';
                    return;
                }else{
                    event.returnValue = '密码错误';
                    return;
                }
            }else{
                event.returnValue = '用户不存在';
                return;
            }
        }else{
            console.log(err.message);
            alert("读取数据库失败");
            return;
        }
    })
})

ipcMain.on("chooseAvatar", function(event){
    dialog.showOpenDialog(myWindow_base, {
    properties: ['openFile'],
    filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
    }).then(result => {
        if(!result.canceled){
            event.returnValue = result.filePaths;
        }
        return;
    }).catch(err => {
        console.log(err)
    })
})

ipcMain.on("register", function(event, phone, username, pwd, pwdAgain){
    if(!pwd || !pwdAgain || !phone || !username){
        event.returnValue = "请输入完整信息";
        return;
    }
    if(pwd != pwdAgain){
        event.returnValue = "两次密码输入不一致";
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
                event.returnValue = "用户已经存在";
                return;
            }else{
                let sql = "insert into user(username, passwd, phone) values('" + username + "','" + pwd +"','" + phone + "');";
                connection.query(sql, function(err){
                    if(err){
                        console.log(err.message);
                        event.returnValue = "用户名重复";
                        return;
                    }else{
                        event.returnValue = "注册成功";
                        return;
                    }
                })
            }
        }else{
            console.log(err.message);
            return alert('读取数据库失败');
        }
    })
})

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true
    }
  })
  if(!myWindow_base){
    myWindow_base = mainWindow;
  }
    fs.readFile("./config/user.json", 'utf8', function(err, data){
        if(err){
            console.log(err.message);
            return;
        }else{
            if(!data){
                mainWindow.loadFile('src/html/login.html');
                return;
            }else{
                mainWindow.loadFile('src/html/index.html');
            }
        }
    })
  // and load the index.html of the app.

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
