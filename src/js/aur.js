var webview;

document.getElementById("back").onclick = function(){
    window.location.href = '../html/index.html';
}

onload=()=>{
    webview = document.getElementById('wb');
}

document.getElementById("up").onclick = ()=>{
    if(webview.canGoBack()){
        webview.goBack();
    }
}