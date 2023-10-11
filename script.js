let galleryImages = document.querySelectorAll(".gallery__img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

let newImgWindow;

if (galleryImages) {
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", (e) => {
      let getElementCss = window.getComputedStyle(img);
      let getFullImageUrl = getElementCss.getPropertyValue("background-image");
      let getImageUrlPosition = getFullImageUrl.split("/thumbs/img-");
      let setNewImgUrl = getImageUrlPosition[1].replace('")', "");
      getLatestOpenedImg = index + 1;
      createOverlay();
      ///////// create curr img that contains clicked img
      let newImg = document.createElement("img");
      newImg.setAttribute("class", "current-gallery-img");
      newImg.setAttribute("id", "current-img");
      newImg.setAttribute("src", `/images/img-${setNewImgUrl}`);
      newImgWindow.append(newImg);
      // when image is loaded put btns beside
      newImg.addEventListener("load", () => {
        createGalleryBtns();
      });
    });
  });
}
function changeImg(changeDir) {
  let anyOfIimages = newImgWindow.querySelectorAll("img");
  if (anyOfIimages) {
    anyOfIimages.forEach((img) => {
      img.remove();
    });
  }
  let newImg = document.createElement("img");
  newImgWindow.append(newImg);

  newImg.setAttribute("class", "current-gallery-img");
  let calcNewImg;
  if (changeDir === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) calcNewImg = 1;
    newImg.classList.remove("left-image");
    newImg.classList.add("right-image");
  } else if (changeDir === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    newImg.classList.remove("right-image");
    newImg.classList.add("left-image");
    if (calcNewImg < 1) calcNewImg = galleryImages.length;
  }

  newImg.setAttribute("src", `images/img-${calcNewImg}.jpg`);
  newImg.setAttribute("id", "current-gallery-img");
  getLatestOpenedImg = calcNewImg;
}
function createGalleryBtns(e) {
  ///////////// create btns
  // prev btn
  let prevBtn = document.createElement("button");
  prevBtn.setAttribute("class", "gallery-btn gallery-btn--prev");
  prevBtn.addEventListener("click", () => {
    changeImg(0);
  });
  let prevImgIcon = document.createElement("i");
  prevImgIcon.setAttribute("class", "fa-solid fa-chevron-left");
  prevBtn.append(prevImgIcon);
  newImgWindow.append(prevBtn);
  // next btn
  let nextBtn = document.createElement("button");
  nextBtn.setAttribute("class", "gallery-btn gallery-btn--next");
  nextBtn.addEventListener("click", () => {
    changeImg(1);
  });
  let nextImgIcon = document.createElement("i");
  nextImgIcon.setAttribute("class", "fa-solid fa-chevron-right");
  nextBtn.append(nextImgIcon);
  newImgWindow.append(nextBtn);
}

function createOverlay() {
  ////////// create overlay for curr img
  newImgWindow = document.createElement("div");
  newImgWindow.setAttribute("class", "overlay-image");

  ////////// when clicks overlay close img
  newImgWindow.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.remove();
    }
  });
  document.body.append(newImgWindow);
}
