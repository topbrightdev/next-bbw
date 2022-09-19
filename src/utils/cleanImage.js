export const cleanImage = (logo) => {
  if (logo.indexOf("(") !== -1) {
    let point = logo.indexOf("(");
    let newImage = logo.slice(point);
    return newImage.substring(1, newImage.length - 1);
  } else {
    return logo;
  }
};
