const TextBtn = document.getElementById("textSearchBtn");
const TemporalBtn = document.getElementById("temporalSearchBtn");
const AsrBtn = document.getElementById("asrSearchBtn");
const OcrBtn = document.getElementById("ocrSearchBtn");
const ImageBtn = document.getElementById("imageSearchBtn");

const TextSearch = document.getElementById("TextSearch");
const TemporalSearch = document.getElementById("TemporalSearch");
// Giả sử bạn có thêm div cho ASR và OCR (giống TextSearch)
const AsrSearch = document.getElementById("AsrSearch");
const OcrSearch = document.getElementById("OcrSearch");
const ImageSearch = document.getElementById("ImageSearch");
const FilterPanel = document.getElementById("FilterPanel");
const KSlider = document.getElementById("KSlider");

function switchSearchMode(mode) {
  // Ẩn tất cả panel
  [TextSearch, TemporalSearch, AsrSearch, OcrSearch, ImageSearch].forEach(
    (el) => {
      if (el) el.classList.add("hidden");
    }
  );

  // Reset style nút
  [TextBtn, TemporalBtn, AsrBtn, OcrBtn, ImageBtn].forEach((btn) => {
    btn.classList.remove("bg-[#E5BEB5]", "text-white");
    btn.classList.add("bg-[#F5FAE1]", "text-black");
  });

  // Ẩn FilterPanel nếu đang ở temporal
  if (mode === "temporal") {
    FilterPanel.classList.add("hidden");
    KSlider.classList.add("hidden");
  } else {
    FilterPanel.classList.remove("hidden");
    KSlider.classList.remove("hidden");
  }

  // Kích hoạt đúng panel & style cho nút
  if (mode === "text") {
    TextSearch.classList.remove("hidden");
    TextBtn.classList.add("bg-[#E5BEB5]", "text-white");
  } else if (mode === "temporal") {
    TemporalSearch.classList.remove("hidden");
    TemporalBtn.classList.add("bg-[#E5BEB5]", "text-white");
  } else if (mode === "asr") {
    AsrSearch.classList.remove("hidden");
    AsrBtn.classList.add("bg-[#E5BEB5]", "text-white");
  } else if (mode === "ocr") {
    OcrSearch.classList.remove("hidden");
    OcrBtn.classList.add("bg-[#E5BEB5]", "text-white");
  } else if (mode === "image") {
    ImageSearch.classList.remove("hidden");
    ImageBtn.classList.add("bg-[#E5BEB5]", "text-white");
  }
}

// Event listener
TextBtn.addEventListener("click", () => switchSearchMode("text"));
TemporalBtn.addEventListener("click", () => switchSearchMode("temporal"));
AsrBtn.addEventListener("click", () => switchSearchMode("asr"));
OcrBtn.addEventListener("click", () => switchSearchMode("ocr"));
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
