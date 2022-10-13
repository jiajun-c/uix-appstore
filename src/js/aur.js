var webview;

document.getElementById("back").onclick = function(){
    window.location.href = '../index.html';
}

onload=()=>{
    webview = document.getElementById('wb');
}

document.getElementById("up").onclick = ()=>{
    if(webview.canGoBack()){
        webview.goBack();
    }
}