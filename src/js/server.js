

// onload = ()=>{
//     var answer = "UserName";
//     document.getElementById("UserName").innerHTML = answer;
// }

document.getElementById("add").onclick = ()=>{
    var num = document.getElementById("count").innerText;
    num += 1;
    document.getElementById("count").innerText = num;

    var servers = document.getElementsByClassName("servers");
    servers = servers[servers.length - 1];
    var code = '<br/><div class="servers"><div class="FirstLine"><span class="information" id="ip' + num + '">ip:</span><input placeholder="ip" style="width: 20%;">&nbsp'+
                    '<span class="information" id="host' + num + '">Host:</span><input placeholder="Host" style="width: 20%">&nbsp' +
                    '<span class="information" id="pwd' + num + '">PassWord:</span><input placeholder="PassWord" style="width: 20%" type="password">'+
                    '<div style="display: inline-block;">' +
                        '<span>更多</span>' + 
                        '<div style="text-align: center; width: 40px;height:40px; line-height:20px; float: right;">' +
                            '<div class="menu">' + 
                                '<img alt="" src="../img/right.png" style="display: inline-block; vertical-align: middle; width: 20px; height: 20px;" class="imgSpan" onclick="dropDown(this.id);" id="img' + num + '" />' +
                                '<div class="dropDown" style="display: none; width: 40px; background-color:PaleTurquoise;" id="dropDown' + num + '">' +
                                    '<span>管理</span><br/><span>关机</span><br/><span>重启</span><br/><span>选项</span>' +
                                '</div>' +
                            '</div>' + 
                        '</div>' +
                    '</div>' + 
                '</div>' + 
                '<div class="FirstLine">' +
                    '&nbsp;&nbsp;<span style="padding-left: 10px;">DiscCapacity:&nbsp;</span><span>unknown</span>&nbsp;&nbsp;<span style="padding-left: 50px;">ConnectionStatus:&nbsp;</span><span>未连接</span>&nbsp;&nbsp;' +
                    '<button  onmouseover="this.style.backgroundColor = \'CadetBlue\'" onmouseleave="this.style.backgroundColor = \'PaleTurquoise\'"  style=" left: 150px; position: relative; background-color: PaleTurquoise; border-radius: 20%;" id="connect' + num + '">连接</button></div></div>';
    $(servers).after(code);
}


function dropDown(imgName){
    var dropName = new String(imgName).replace("img", "dropDown");
    if(document.getElementById(imgName).getAttribute("src") === "../img/right.png"){
        document.getElementById(imgName).setAttribute("src", "../img/down.png");
    }else{
        document.getElementById(imgName).setAttribute("src", "../img/right.png");
    }
    console.log(document.getElementById(imgName).getAttribute("src"));
    $("#" + dropName).toggle();
}

