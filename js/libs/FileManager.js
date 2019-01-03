/**
 * FileManager API
 * 
 * Dependencies: Load Image API
 * 
 * @author Vinicius Xavier
 */

class FileManager {

    constructor(){
        throw new Error("This class cannot be instantiated");
    }

    static downloadFile (blob, name="untitled") {
        let a = document.createElement("a"), url = URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        document.body.appendChild(a).click();
        document.body.removeChild(a);
    }

    static downloadFiles (blobs, name="untitled", ...names) {
        console.log(name, names);
        for (let i = 0; i < blobs.length; i++)
            FileManager.downloadFile(blobs[i], !names.length || (names.length && i == 0) ? name : names[i-1]);
    }

    static loadImage (image, preferredWidth){
        return new Promise((resolve, reject) => {
            try {
                loadImage.parseMetaData(image, data =>
                    loadImage(
                        image,
                        resolve,
                        preferredWidth ? {
                            canvas: true,
                            orientation: data.exif ? data.exif.get("Orientation") : 0,
                            maxWidth: preferredWidth
                        }:{
                            canvas: true,
                            orientation: data.exif ? data.exif.get("Orientation") : 0
                        }
                    )
                );
            } catch (e) {
                reject(e.message);
            }
        })
    }

    static loadImages (images, preferredWidth) {
        let loadingImages = [];
        for (let i = 0; i < images.length; i++)
            loadingImages.push(FileManager.loadImage(images[i], preferredWidth));
        return Promise.all(loadingImages);
    }
}