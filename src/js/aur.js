var webview;

document.getElementById("back").onclick = function(){
    window.location.href = '../html/index.html';
}

onload=()=>{
    webview = document.getElementById('wb');
}

document.getElementById("before").onclick = ()=>{
    if(webview.canGoBack()){
        webview.goBack();
    }
}