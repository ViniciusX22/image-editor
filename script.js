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

function start(){
    c.width = imagens[i].width;
    c.height = imagens[i].height;
    c.style.width = imagens[i].width;
    c.style.height = imagens[i].height;
    ctx.drawImage(imagens[i], 0, 0);
    if(decorator){
        if(decorator.width > imagens[i].width)
            ctx.drawImage(decorator, 0, imagens[i].height - (1 - (decorator.width - imagens[i].width) / decorator.width) * decorator.height, imagens[i].width, (1 - (decorator.width - imagens[i].width) / decorator.width) * decorator.height);
        else
            ctx.drawImage(decorator, (imagens[i].width - decorator.width) / 2, imagens[i].height - decorator.height, decorator.width, decorator.height);
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