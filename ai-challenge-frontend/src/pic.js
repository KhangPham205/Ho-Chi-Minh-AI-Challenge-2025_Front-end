let currentZoom = 1;
let isDragging = false;
let startX,
  startY,
  translateX = 0,
  translateY = 0;

function viewFrame(imgUrl) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modalImg.src = imgUrl;
  modal.classList.remove("hidden");

  resetTransform();
}

// Reset zoom & position
function resetTransform() {
  currentZoom = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function applyTransform() {
  const img = document.getElementById("modalImage");
  img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
}

// Zoom bằng cuộn chuột
document.getElementById("imageModal").addEventListener("wheel", (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    currentZoom += 0.1; // zoom in
  } else {
    currentZoom = Math.max(0.5, currentZoom - 0.1); // zoom out (min 0.5x)
  }
  applyTransform();
});

// Drag để di chuyển ảnh
const modalImg = document.getElementById("modalImage");

modalImg.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  modalImg.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  modalImg.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  applyTransform();
});

// Đóng modal khi click nền đen (không phải ảnh)
document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target.id === "imageModal") {
    e.currentTarget.classList.add("hidden");
  }
});
