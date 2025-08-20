const TextBtn = document.getElementById("textSearchBtn");
const TemporalBtn = document.getElementById("temporalSearchBtn");
const ImageBtn = document.getElementById("imageSearchBtn");

const TextSearch = document.getElementById("TextSearch");
const TemporalSearch = document.getElementById("TemporalSearch");
const ImageSearch = document.getElementById("ImageSearch");

const searchBtn = document.getElementById("searchBtn");
const answers = document.getElementById("answers");

// Gom vào 1 hàm chung để switch
function switchSearchMode(mode) {
  // Ẩn tất cả panel
  TextSearch.classList.add("hidden");
  TemporalSearch.classList.add("hidden");
  ImageSearch.classList.add("hidden");

  // Reset style nút
  [TextBtn, TemporalBtn, ImageBtn].forEach(btn => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-gray-300");
  });

  // Hiện đúng panel & active nút
  if (mode === "text") {
    TextSearch.classList.remove("hidden");
    TextBtn.classList.add("bg-blue-500", "text-white");
    TextBtn.classList.remove("bg-gray-300");
  } else if (mode === "temporal") {
    TemporalSearch.classList.remove("hidden");
    TemporalBtn.classList.add("bg-blue-500", "text-white");
    TemporalBtn.classList.remove("bg-gray-300");
  } else if (mode === "image") {
    ImageSearch.classList.remove("hidden");
    ImageBtn.classList.add("bg-blue-500", "text-white");
    ImageBtn.classList.remove("bg-gray-300");
  }
}

// Event listener
TextBtn.addEventListener("click", () => switchSearchMode("text"));
TemporalBtn.addEventListener("click", () => switchSearchMode("temporal"));
ImageBtn.addEventListener("click", () => switchSearchMode("image"));

// Mặc định mở TextSearch
switchSearchMode("text");

// demo search: lấy nội dung và hiển thị
searchBtn.addEventListener("click", () => {
  let query = "";
  if (!TextSearch.classList.contains("hidden")) {
    query = document.getElementById("queryBasic").value;
  } else {
    query = document.getElementById("queryTemporal").value;
  }

  answers.innerHTML = `<div class="bg-white p-2 rounded shadow">🔎 You searched: <b>${query}</b></div>`;
});

// slider
const kRange = document.getElementById("kRange");
  const kValue = document.getElementById("kValue");

  kRange.addEventListener("input", () => {
    kValue.textContent = kRange.value;
  });
