var c;
var ctx;
var width, height;
var blob_imgs = [];

window.onload = init;

function init(){
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    width = c.width;
    height = c.height;
}

function resize(val, max, val2=val){
    return val > max ? (1 - (val - max) / val) * val2 : val;
}

function getPercentSize(val, max){
    return val > max ? (1 - (val - max) / val) : val;
}

function start(){
    var preferredWidth = imagens[i].width, preferredHeight = imagens[i].height;
    if(imagens[i].width > 500){
        console.log("Eh");
        preferredWidth = resize(imagens[i].width, 500);
        preferredHeight = getPercentSize(imagens[i].width, 500) * imagens[i].height;
    }
    c.width = preferredWidth;
    c.height = preferredHeight;
    c.style.width = preferredWidth;
    c.style.height = preferredHeight;
    ctx.drawImage(imagens[i], 0, 0, preferredWidth, preferredHeight);
    if(decorator){
        if(decorator.width > preferredWidth)
            ctx.drawImage(decorator, 0, preferredHeight - resize(decorator.width, preferredWidth, decorator.height), preferredWidth, resize(decorator.width, preferredWidth, decorator.height));
        else
            ctx.drawImage(decorator, (preferredWidth - decorator.width) / 2, preferredHeight - decorator.height, decorator.width, decorator.height);
    }
    c.toBlob(function(blob){
        blob_imgs[i++] = blob;
        if(i < imagens.length)start();
        else document.querySelector("#download-button").style.display = "block";
    })
}

function download(){
    for(var i = 0; i < blob_imgs.length; i++){
        var a = document.createElement("a"), url = URL.createObjectURL(blob_imgs[i]);
        a.href = url;
        a.download = imgs_name[i];
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    reset();
}

function remove(a){
    console.log(a);
    document.body.removeChild(a);
}

function reset(){
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, c.width, c.height);
    c.style.width = width;
    c.style.height = height;
    c.style.backgroundColor = "lightgray";
    document.querySelector("#download-button").style.display = "none";
}