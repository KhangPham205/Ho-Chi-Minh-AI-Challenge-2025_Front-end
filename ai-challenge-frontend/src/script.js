const TextBtn = document.getElementById("textSearchBtn");
const TemporalBtn = document.getElementById("temporalSearchBtn");
const ImageBtn = document.getElementById("imageSearchBtn");

const TextSearch = document.getElementById("TextSearch");
const TemporalSearch = document.getElementById("TemporalSearch");
const ImageSearch = document.getElementById("ImageSearch");

const searchBtn = document.getElementById("searchBtn");
const answers = document.getElementById("answers");

function switchSearchMode(mode) {
  // Ẩn tất cả panel
  TextSearch.classList.add("hidden");
  TemporalSearch.classList.add("hidden");
  ImageSearch.classList.add("hidden");

  // Reset style nút
  [TextBtn, TemporalBtn, ImageBtn].forEach((btn) => {
    btn.classList.remove("bg-[#E5BEB5]", "text-white");
    btn.classList.add("bg-gray-300");
  });

  // Hiện đúng panel & active nút
  if (mode === "text") {
    TextSearch.classList.remove("hidden");
    TextBtn.classList.add("bg-[#E5BEB5]", "text-white");
    TextBtn.classList.remove("bg-gray-300");
  } else if (mode === "temporal") {
    TemporalSearch.classList.remove("hidden");
    TemporalBtn.classList.add("bg-[#E5BEB5]", "text-white");
    TemporalBtn.classList.remove("bg-gray-300");
  } else if (mode === "image") {
    ImageSearch.classList.remove("hidden");
    ImageBtn.classList.add("bg-[#E5BEB5]", "text-white");
    ImageBtn.classList.remove("bg-gray-300");
  }
}

// Event listener
TextBtn.addEventListener("click", () => switchSearchMode("text"));
TemporalBtn.addEventListener("click", () => switchSearchMode("temporal"));
ImageBtn.addEventListener("click", () => switchSearchMode("image"));

// Mặc định mở TextSearch
switchSearchMode("text");

// slider
const kRange = document.getElementById("kRange");
const kValue = document.getElementById("kValue");

kRange.addEventListener("input", () => {
  kValue.textContent = kRange.value;
});

const chatBubble = document.getElementById("chatBubble");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
