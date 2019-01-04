var c, stage;
var images = [];
var decorator;
var indexImage = indexBlob = 0;
var update = false;

function init(){
	c = document.getElementById("canvas");
    stage = new createjs.Stage("canvas");
    createjs.Touch.enable(stage);
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true;
	createjs.Ticker.addEventListener("tick", (event) => {
        if (update) {
            update = false;
            stage.update(event);
        }
    });
}

function getImages(e){
	images = [];
	indexImage = 0;
    FileManager
        .loadImages(e.target.files, preferredWidth)
        .then(imgs => imgs.forEach(img => images[indexImage++] = img))
        .catch(error => console.log(error));
}

function getDecorator(e){
    FileManager
        .loadImage(e.target.files[0])
        .then(img => decorator = img)
        .catch(error => console.log(error));
}