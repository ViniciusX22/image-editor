var imagens = imgs_name = [];
var decorator;
var files;
var file;
var j = 0;
var i = 0;

// window.onload = () => {
// 	document.getElementById('input').onchange = function (e) {
// 	    for (var i = 0; i < e.target.files.length; i++) {
// 	    	loadImage(
// 	        	e.target.files[i],
// 	       		function (img) {
// 	       	     	imagens[i] = img;
// 	       	     	imgs_name[i] = img.name;
// 	       	     	console.log(img);
// 	        	},
// 	        	{maxWidth: 500} // Options
// 	    	);
// 	    }
// 	};
// }

function getImages(e){
	imagens = [];
	i = j = 0;
	// Checa de o navegador suporta as APIs
	if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
		// caso não suporte
		alert('As APIs de manipulação de arquivos não são suportadas por este navegador\nNão foi possível fazer o uoload');
		return; // encerra a execução
	}

	files = e.target.files; // pega a lista de arquivos selecionados no input

	file = new FileReader(); // cria um novo FileReader para executar a leitura das imagens
	file.onload = handleFileLoad; // define a função a ser chamada quando o arquivo carregar (quando for lido)
	readFile(); // chama a função que lerá o arquivo
}

function getDecorator(e){
	// Checa de o navegador suporta as APIs
	if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
		// caso não suporte
		alert('As APIs de manipulação de arquivos não são suportadas por este navegador\nNão foi possível fazer o uoload');
		return; // encerra a execução
	}

	files = e.target.files; // pega a lista de arquivos selecionados no input

	file = new FileReader(); // cria um novo FileReader para executar a leitura das imagens
	file.onload = function(e){
		var dataURL = file.result;
		var img = new Image();
		img.onload = e => {decorator = e.target;i = 0;start()};
		img.src = dataURL;
	}; // define a função a ser chamada quando o arquivo carregar (quando for lido)
	file.readAsDataURL(files[0]);
}

function handleFileLoad(evt){
	var dataURL = file.result;
	var img = new Image();
	img.onload = handleImage;
	img.src = dataURL;
	if(files.length > i){ // caso ainda tenha arquivos na lista
		readFile(); // lê mais um
	}else{
		showMessage();
	}
}

function showMessage(){
	// alert("Imagens configuradas com sucesso!");
	console.log(imgs_name);
}

function handleImage(e){
	// console.log("Imagem",j);
	imagens[j++] = e.target;
}

function readFile(){
	imgs_name[i] = files[i].name;
	// console.log("Nome:",i);
	file.readAsDataURL(files[i++]);
}