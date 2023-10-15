let img, lens, result, cx, cy;

function imageZoomOn(imgID, resultID) {
  //console.log("zoom on");
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /* Insert lens: */
  img.parentElement.insertBefore(lens, img);
  /* Calculate the ratio between result DIV and lens: */
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /* Set background properties for the result DIV */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  // listeners
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /* And also for touch screens: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
}

function imageZoomOff() {
  //console.log("zoom off");
  lens?.removeEventListener("mousemove", moveLens);
  img?.removeEventListener("mousemove", moveLens);
  lens?.removeEventListener("touchmove", moveLens);
  img?.removeEventListener("touchmove", moveLens);
  lens?.remove();
}

function moveLens(e) {
  var pos, x, y;
  /* Prevent any other actions that may occur when moving over the image */
  e.preventDefault();
  /* Get the cursor's x and y positions: */
  pos = getCursorPos(e);
  /* Calculate the position of the lens: */
  x = pos.x - lens.offsetWidth / 2;
  y = pos.y - lens.offsetHeight / 2;
  /* Prevent the lens from being positioned outside the image: */
  let offImage = false;
  if (x > img.width - lens.offsetWidth) {
    offImage = true;
    x = img.width - lens.offsetWidth;
  }
  if (x < 0) {
    offImage = true;
    x = 0;
  }
  if (y > img.height - lens.offsetHeight) {
    offImage = true;
    y = img.height - lens.offsetHeight;
  }
  if (y < 0) {
    offImage = true;
    y = 0;
  }
  /* Set the position of the lens: */
  lens.style.left = x + "px";
  lens.style.top = y + "px";
  /* Display what the lens "sees": */
  if (offImage) {
    result.style.display = "none";
  } else {
    result.style.display = "block";
    result.style.top =
      pos.y + result.offsetHeight >= img.height
        ? pos.y - result.offsetHeight + "px"
        : pos.y + "px";
    result.style.left =
      pos.x + result.offsetWidth >= img.width
        ? pos.x - result.offsetWidth + "px"
        : pos.x + "px";
    // result.style.top = pos.y + "px";
    // result.style.left = pos.x + "px";
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
}

function getCursorPos(e) {
  var a,
    x = 0,
    y = 0;
  e = e || window.event;
  /* Get the x and y positions of the image: */
  a = img.getBoundingClientRect();
  /* Calculate the cursor's x and y coordinates, relative to the image: */
  x = e.pageX - a.left;
  y = e.pageY - a.top;
  /* Consider any page scrolling: */
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;
  return { x: x, y: y };
}

export { imageZoomOn, imageZoomOff };
