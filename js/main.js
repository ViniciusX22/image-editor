var blob_imgs = [];
var stageImage, stageDecorator;
var preferredWidth = 500;
var decCachePos;

function setCanvasWidthAndHeight(img){
    c.width = img.width
    c.height = img.height
    c.style.width = img.width
    c.style.height = img.height
}

function start(){
    indexImage = 0;
    setCanvasWidthAndHeight(images[indexImage]);
    stageImage = new createjs.Bitmap(images[indexImage]);
    stageImage.x = stageImage.y = 0;
    stage.addChild(stageImage);
    if (decorator) {
        stageDecorator = new createjs.Bitmap(decorator);
        stageDecorator.x = (images[indexImage].width - decorator.width) / 2;
        stageDecorator.y = (images[indexImage++].height - decorator.height);
        stageDecorator.on("mousedown", e => decCachePos = e.stageX - e.target.x);
        stageDecorator.on("pressmove", e => {
            e.target.x = e.stageX - decCachePos;
            e.target.y = e.stageY - decCachePos;
        })
        stage.addChild(stageDecorator);
    }
    document.querySelector("#download-button").style.display = "block";
}

function drawImages(blob){
    blob_imgs[indexBlob++] = blob;
    if (indexBlob == images.length) FileManager.downloadFiles(blob_imgs, "Imagem.png");
    else {
        setCanvasWidthAndHeight(images[indexImage]);
        stageImage.image = images[indexImage++];
        stage.update();
        c.toBlob(drawImages);
    }
}