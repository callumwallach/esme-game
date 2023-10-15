import { imageZoomOn, imageZoomOff } from "./zoom.js";

function showMosaic() {
  localStorage.setItem("mode", "mosaic");
  document.getElementById("gameModeButton").style.display = "block";
  document.getElementById("mosaic").style.display = "block";
  document.getElementById("zoomed").style.display = "block";
  imageZoomOn("mosaic", "zoomed");
}

function hideMosaic() {
  document.getElementById("gameModeButton").style.display = "none";
  document.getElementById("mosaic").style.display = "none";
  document.getElementById("zoomed").style.display = "none";
  imageZoomOff();
}

export { hideMosaic, showMosaic };
