var webview;

document.getElementById("back").onclick = function(){
    window.location.href = '../html/index.html';
}

onload=()=>{
    webview = document.getElementById('wb');
    webview.addEventListener("did-navigate", ()=>{
        document.getElementById('disappear').style.display='none';
        document.getElementById('alert').style.display = 'none';
    })
}

document.getElementById("before").onclick = ()=>{
    if(webview.canGoBack()){
        webview.goBack();
    }else{
        let warnPlace = document.getElementById('alert');
        warnPlace.style.display = 'block';
        document.getElementById('disappear').style.display='block';
    }
}

document.getElementById('disappear').onclick=()=>{
    document.getElementById('disappear').style.display='none';
    document.getElementById('alert').style.display = 'none';
}