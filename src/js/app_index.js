const fs = require('fs');
const exec = require('child_process').execSync;
var child = require('child_process');

window.onload = function() {
    const primerData = document.getElementById("res");
    let f = function() {
        var exe = "sudo -S pacman -R " + this.value + " < data/input"
        child.exec(exe);
        this.textContent = "Try to uninstall"

        setTimeout(function(){
            show();
            if (this) this.textContent = "can not be removed"
        }, 2000);
        // setTimeout(show(), 4000);
    }
    let show = function() {
    child.exec("pacman -Qs > data/temp", function (err, data) {
        exec("python -u src/backend/list_package.py");
        let process_file = function() {
            fs.readFile("data/local_package.json", (err, data) => {
                while(primerData.hasChildNodes()) {
                    primerData.removeChild(primerData.firstChild);
                }
                var json = JSON.parse(data);
                for (var i = 0; i < json.length; i++) {
                    console.log(json[i]);
                    let node = document.createElement('div');
                    node.id = "package_box";

                    let from = document.createElement('div');
                    from.style = "float: left";
                    from.id = "box_text";
                    from.textContent = json[i].name;

                    let button = document.createElement('button');
                    button.style = "float: right";
                    button.id = "trash";
                    button.value = json[i].name;
                    // To do 
                    button.className = "fa fa-trash";
                    button.onclick = f;
                    // 后面还需要判断是否已经安装
                    // button.textContent = "remove";

                    let software = document.createElement('div');
                    software.id = "box_text";
                    software.style = "float: right";
                    software.textContent = json[i].version;
            
                    node.appendChild(from);
                    node.appendChild(button);
                    node.appendChild(software);
                    primerData.appendChild(node);
                }
            });
        }
        process_file();
    });
}
show();
}