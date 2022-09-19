import { storage } from "config/firebase";

export const convertImgDataURLtoBase64 = async (url, callback) => {
  try {
    let myUrl = url;
    if (url.includes("firebasestorage")) {
      myUrl = await storage.refFromURL(url).getDownloadURL();
    }
    let img = new Image();

    img.crossOrigin = "Anonymous";

    img.onload = function () {
      let canvas = document.createElement("CANVAS");
      let ctx = canvas.getContext("2d");
      let dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL("image/png");
      callback(dataURL);
      canvas = null;
    };

    img.src = myUrl;
    img.onerror = function () {
      console.error("Error in image", url);
    };
  } catch (error) {
    console.error("ERROR", error);
  }
};
