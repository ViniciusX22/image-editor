var blob_imgs = [];
var stageImage, stageDecorator;
var preferredWidth = 500;

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
    stageImage.regX = stageImage.image.width / 2;
    stageImage.regY = stageImage.image.height / 2;
    stageImage.cursor = "grab";
    stage.addChild(stageImage);
    if (decorator) {
        stageDecorator = new createjs.Bitmap(decorator);
        stageDecorator.x = (images[indexImage].width - decorator.width) / 2;
        stageDecorator.y = (images[indexImage++].height - decorator.height);
        stageDecorator.on("mousedown", function(e) {
            this.offset = {x: this.x - e.stageX, y: this.y - e.stageY};
            this.cursor = "grabbing";
        });
        stageDecorator.on("pressmove", function(e) {
            this.x = e.stageX + this.offset;
            this.y = e.stageY + this.offset;
            update = true;
        });
        stageDecorator.on("pressup", function(e) {
            this.cursor = "grab";
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