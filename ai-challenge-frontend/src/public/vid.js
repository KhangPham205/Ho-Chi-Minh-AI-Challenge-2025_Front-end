function openVideo(url, timestamp) {
  const popup = document.getElementById("videoPopup");
  const video = document.getElementById("popupVideo");
  popup.classList.remove("hidden");

  video.src = url;
  video.currentTime = timestamp / 1000; // nhảy tới timestamp
  video.play();
}

function closeVideo() {
  const popup = document.getElementById("videoPopup");
  const video = document.getElementById("popupVideo");
  video.pause();
  popup.classList.add("hidden");
}

function viewFrame(imgUrl) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modalImg.src = imgUrl;
  modal.classList.remove("hidden");

  modal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

// Đóng popup khi click ngoài video
document.getElementById("videoPopup").addEventListener("click", (e) => {
  if (e.target.id === "videoPopup") {
    closeVideo();
  }
});

// Đóng modal khi click ngoài ảnh
document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target.id === "imageModal") {
    document.getElementById("imageModal").classList.add("hidden");
  }
});
