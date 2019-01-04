var c, stage;
var images = [];
var decorator;
var indexImage = indexBlob = 0;

function init(){
	c = document.getElementById("canvas");
    stage = new createjs.Stage("canvas");
    createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	createjs.Ticker.addEventListener("tick", () => stage.update());
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